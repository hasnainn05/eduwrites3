"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DGradientBackdrop() {
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
    camera.position.z = 0;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      precision: "highp",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setClearColor(0x0f172a, 1); // Dark slate base
    renderer.domElement.style.pointerEvents = "none";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create dynamic gradient plane
    const planeGeometry = new THREE.PlaneGeometry(2, 2);

    // Create animated gradient shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;

        void main() {
          // Base dark color
          vec3 darkColor = vec3(0.06, 0.11, 0.26); // Dark slate blue
          
          // Gradient colors
          vec3 color1 = vec3(0.39, 0.40, 0.95); // Indigo
          vec3 color2 = vec3(0.02, 0.72, 0.86); // Cyan
          vec3 color3 = vec3(0.65, 0.54, 0.98); // Purple
          vec3 color4 = vec3(0.96, 0.44, 0.71); // Pink
          
          // UV coordinates
          vec2 uv = gl_FragCoord.xy / vec2(1920.0, 1080.0);
          
          // Create smooth gradient with time-based animation
          float gradient1 = sin(uv.x * 1.5 + time * 0.3) * 0.5 + 0.5;
          float gradient2 = cos(uv.y * 1.2 + time * 0.25) * 0.5 + 0.5;
          float gradient3 = sin((uv.x + uv.y) * 1.0 + time * 0.2) * 0.5 + 0.5;
          
          // Add mouse influence
          float mouseInfluence = distance(uv, mouse) * 0.5;
          
          // Combine gradients
          vec3 topGradient = mix(
            color1,
            color2,
            sin(uv.x + time * 0.2) * 0.5 + 0.5
          );
          
          vec3 bottomGradient = mix(
            color3,
            color4,
            cos(uv.x - time * 0.15) * 0.5 + 0.5
          );
          
          // Vertical gradient blend
          vec3 finalColor = mix(
            topGradient,
            bottomGradient,
            uv.y + sin(time * 0.1) * 0.1
          );
          
          // Blend with dark base
          finalColor = mix(darkColor, finalColor, 0.25);
          
          // Add subtle vignette
          float vignette = 1.0 - length(uv - 0.5) * 0.6;
          finalColor *= vignette * 0.85 + 0.2;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const plane = new THREE.Mesh(planeGeometry, material);
    scene.add(plane);

    let mouseX = 0.5;
    let mouseY = 0.5;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      (material.uniforms.mouse as any).value.set(mouseX, mouseY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.0005; // Slow animation
      (material.uniforms.time as any).value = time;

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
      planeGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
