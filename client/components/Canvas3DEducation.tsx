"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DEducation() {
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
    camera.position.z = 45;
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

    // Create knowledge spheres (representing different fields of study)
    const spheres: any[] = [];
    const spherePositions = [
      new THREE.Vector3(0, 0, 0), // Center
      new THREE.Vector3(15, 8, 5), // Top right
      new THREE.Vector3(-15, 8, 5), // Top left
      new THREE.Vector3(12, -10, -8), // Bottom right
      new THREE.Vector3(-12, -10, -8), // Bottom left
    ];

    const sphereColors = [
      0x6366f1, // Indigo - Center
      0x06b6d4, // Cyan
      0xa78bfa, // Purple
      0xf472b6, // Pink
      0x10b981, // Green
    ];

    const sphereLabels = [
      "Knowledge",
      "Science",
      "Arts",
      "Technology",
      "Growth",
    ];

    spherePositions.forEach((pos, idx) => {
      const size = idx === 0 ? 3.5 : 2.8;
      const geometry = new THREE.IcosahedronGeometry(size, 4);
      const material = new THREE.MeshPhongMaterial({
        color: sphereColors[idx],
        emissive: sphereColors[idx],
        emissiveIntensity: idx === 0 ? 0.6 : 0.4,
        shininess: 100,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(pos);
      scene.add(mesh);

      spheres.push({
        mesh,
        material,
        basePosition: pos.clone(),
        speed: 0.002 + idx * 0.0008,
        rotationSpeed: 0.005 + idx * 0.002,
        label: sphereLabels[idx],
        floatAmount: 2 + idx,
      });
    });

    // Create connecting lines with gradient effect
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const createGradientLine = (
      start: THREE.Vector3,
      end: THREE.Vector3,
      color1: number,
      color2: number,
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        start.x,
        start.y,
        start.z,
        end.x,
        end.y,
        end.z,
      ]);
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      // Create a line with gradient effect using two materials
      const material = new THREE.LineBasicMaterial({
        color: color1,
        transparent: true,
        opacity: 0.5,
      });

      const line = new THREE.Line(geometry, material);
      return { line, geometry, material };
    };

    // Connect center to all other spheres
    const connections: any[] = [];
    for (let i = 1; i < spherePositions.length; i++) {
      const conn = createGradientLine(
        spherePositions[0],
        spherePositions[i],
        sphereColors[0],
        sphereColors[i],
      );
      lineGroup.add(conn.line);
      connections.push(conn);
    }

    // Create floating particles along the learning paths
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 60;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      map: new THREE.CanvasTexture(createParticleTexture()),
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);

    // Helper function to create particle texture
    function createParticleTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext("2d")!;
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 64, 64);
      return canvas;
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1.5, 120);
    pointLight1.position.set(40, 40, 60);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.3, 120);
    pointLight2.position.set(-40, -40, 60);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa78bfa, 0.8, 100);
    pointLight3.position.set(0, 50, -40);
    scene.add(pointLight3);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const startTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Animate knowledge spheres
      spheres.forEach((sphere, idx) => {
        const { mesh, basePosition, speed, rotationSpeed, floatAmount } =
          sphere;

        // Rotation
        mesh.rotation.x += rotationSpeed;
        mesh.rotation.y += rotationSpeed * 0.7;
        mesh.rotation.z += rotationSpeed * 0.4;

        // Floating motion
        mesh.position.copy(basePosition);
        mesh.position.y += Math.sin(elapsed * speed + idx) * floatAmount;
        mesh.position.x +=
          Math.cos(elapsed * speed * 0.7 + idx) * (floatAmount * 0.5);

        // Respond to mouse
        mesh.position.x += mouseX * 2;
        mesh.position.y += mouseY * 2;

        // Pulsing scale based on proximity
        const scale = 1 + Math.sin(elapsed * 0.5 + idx * 0.5) * 0.08;
        mesh.scale.set(scale, scale, scale);
      });

      // Animate connecting lines
      connections.forEach((conn: any, idx: number) => {
        const pulse = Math.sin(elapsed + idx) * 0.3 + 0.5;
        conn.material.opacity = pulse * 0.6;
      });

      // Animate particles
      const positionAttribute = particleGeometry.getAttribute("position");
      const pos = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        pos[i] += Math.sin(elapsed + i) * 0.05;
        pos[i + 1] += Math.cos(elapsed + i) * 0.05;
        pos[i + 2] += Math.sin(elapsed + i * 0.5) * 0.03;

        if (Math.abs(pos[i]) > 40) pos[i] = (Math.random() - 0.5) * 40;
        if (Math.abs(pos[i + 1]) > 40) pos[i + 1] = (Math.random() - 0.5) * 40;
        if (Math.abs(pos[i + 2]) > 40) pos[i + 2] = (Math.random() - 0.5) * 40;
      }

      (positionAttribute as any).needsUpdate = true;

      // Animate particle color through spectrum
      const particleColor = Math.sin(elapsed * 0.3) * 0.5 + 0.5;
      particleMaterial.color.setHSL(0.5 + particleColor * 0.1, 1, 0.5);

      // Animate light positions
      pointLight1.position.x = 40 + Math.cos(elapsed * 0.4) * 20;
      pointLight1.position.y = 40 + Math.sin(elapsed * 0.35) * 20;

      pointLight2.position.x = -40 + Math.sin(elapsed * 0.3) * 20;
      pointLight2.position.y = -40 + Math.cos(elapsed * 0.4) * 20;

      // Camera slight movement based on mouse
      camera.position.x = mouseX * 3;
      camera.position.y = mouseY * 3;

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
      particleGeometry.dispose();
      particleMaterial.dispose();
      spheres.forEach((sphere) => {
        sphere.mesh.geometry.dispose();
        sphere.material.dispose();
      });
      connections.forEach((conn: any) => {
        conn.geometry.dispose();
        conn.material.dispose();
      });
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
