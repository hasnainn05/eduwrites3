"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export function Canvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const timeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = null;
      sceneRef.current = scene;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Camera setup - positioned further back for "far away" effect
      const camera = new THREE.PerspectiveCamera(
        60,
        width / height || 1,
        0.1,
        3000,
      );
      camera.position.set(0, 0, 120);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Renderer setup with error handling
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: "highp",
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.pointerEvents = "none";
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create a large particle system for galaxy effect
      const particleCount = 2000;
      const positions = new Float32Array(particleCount * 3);
      const velocities: Array<[number, number, number]> = [];
      const colors = new Float32Array(particleCount * 3);

      // Color palette - vibrant cosmic colors
      const colorPalette = [
        { r: 0 / 255, g: 217 / 255, b: 255 / 255 }, // Bright Cyan
        { r: 100 / 255, g: 150 / 255, b: 255 / 255 }, // Soft Blue
        { r: 168 / 255, g: 85 / 255, b: 247 / 255 }, // Vibrant Purple
        { r: 59 / 255, g: 130 / 255, b: 246 / 255 }, // Medium Blue
        { r: 139 / 255, g: 92 / 255, b: 246 / 255 }, // Medium Purple
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Create particles in a spiral galaxy pattern
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 10;
        const z = (Math.random() - 0.5) * 60;

        positions[i3] = Math.cos(angle) * distance;
        positions[i3 + 1] = Math.sin(angle) * distance;
        positions[i3 + 2] = z;

        // Velocity for subtle movement
        velocities.push([
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005,
        ]);

        // Random colors from palette
        const color =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3),
      );

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.38,
        vertexColors: true,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.rotation.x = Math.PI * 0.15;
      scene.add(particles);
      particlesRef.current = particles;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;
      let isRunning = true;

      const onMouseMove = (event: MouseEvent) => {
        if (!isRunning) return;
        targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener("mousemove", onMouseMove);

      // Animation loop
      const animate = () => {
        if (!isRunning) return;
        animationFrameRef.current = requestAnimationFrame(animate);
        timeRef.current += 0.001;

        // Smooth mouse tracking
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Rotate galaxy slowly
        if (particles) {
          particles.rotation.z += 0.0001;
          particles.rotation.y += 0.00015;

          // Gentle bob motion
          particles.position.y = Math.sin(timeRef.current * 0.3) * 5;
        }

        // Update particle positions for subtle drift
        const positionAttribute = particleGeometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;
        const posArray = positionAttribute.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const vel = velocities[i];

          posArray[i3] += vel[0];
          posArray[i3 + 1] += vel[1];
          posArray[i3 + 2] += vel[2];

          // Wrap around if particle goes too far
          if (Math.abs(posArray[i3]) > 100) posArray[i3] *= -1;
          if (Math.abs(posArray[i3 + 1]) > 100) posArray[i3 + 1] *= -1;
          if (Math.abs(posArray[i3 + 2]) > 100) posArray[i3 + 2] *= -1;
        }
        positionAttribute.needsUpdate = true;

        // Subtle parallax camera movement
        camera.position.x += (mouseX * 20 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 20 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current || !isRunning) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        isRunning = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (
          containerRef.current &&
          renderer.domElement.parentNode === containerRef.current
        ) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch (e) {
            // Element might already be removed
          }
        }
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    } catch (err) {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,40,50,0.1) 0%, rgba(20,20,60,0.05) 30%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(10,40,50,0.05) 0%, rgba(20,20,60,0.02) 30%, transparent 70%)",
      }}
    />
  );
}
