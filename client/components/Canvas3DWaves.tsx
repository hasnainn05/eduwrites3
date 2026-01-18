"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DWaves() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: "highp",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create wave geometry
    const geometry = new THREE.IcosahedronGeometry(8, 50);

    // Create material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x6366f1) }, // Indigo
        color2: { value: new THREE.Color(0x06b6d4) }, // Cyan
      },
      vertexShader: `
        uniform float time;
        
        void main() {
          vec3 pos = position;
          float wave = sin(pos.x * 0.5 + time * 0.5) * 
                       cos(pos.y * 0.5 + time * 0.3) * 
                       sin(pos.z * 0.5 + time * 0.4);
          pos += normalize(position) * wave * 2.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        
        void main() {
          float pattern = sin(gl_FragCoord.x * 0.005 + time * 0.3) * 
                          cos(gl_FragCoord.y * 0.005 + time * 0.2);
          vec3 finalColor = mix(color1, color2, (pattern + 1.0) * 0.5);
          gl_FragColor = vec4(finalColor, 0.4);
        }
      `,
      wireframe: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add some particles for additional effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 80;

      velocities[i] = (Math.random() - 0.5) * 0.2;
      velocities[i + 1] = (Math.random() - 0.5) * 0.2;
      velocities[i + 2] = (Math.random() - 0.5) * 0.2;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const light1 = new THREE.PointLight(0x6366f1, 1, 100);
    light1.position.set(20, 20, 30);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x06b6d4, 1, 100);
    light2.position.set(-20, -20, 30);
    scene.add(light2);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      (material.uniforms.time as any).value = time;

      mesh.rotation.x += 0.0003;
      mesh.rotation.y += 0.0005;
      mesh.rotation.z += 0.0002;

      // Update particles
      const positionAttribute = particleGeometry.getAttribute("position");
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (positions[i] > 40) velocities[i] *= -1;
        if (positions[i] < -40) velocities[i] *= -1;
        if (positions[i + 1] > 40) velocities[i + 1] *= -1;
        if (positions[i + 1] < -40) velocities[i + 1] *= -1;
        if (positions[i + 2] > 40) velocities[i + 2] *= -1;
        if (positions[i + 2] < -40) velocities[i + 2] *= -1;
      }

      (positionAttribute as any).needsUpdate = true;

      // Mouse interaction
      camera.position.x = mouseX * 5;
      camera.position.y = mouseY * 5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleGeometry.dispose();
      material.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
      }}
    />
  );
}
