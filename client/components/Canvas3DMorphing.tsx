"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DMorphing() {
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
    camera.position.z = 35;
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

    // Colors for gradient transitions
    const colors = [
      { r: 0.4, g: 0.4, b: 0.9 }, // Indigo
      { r: 0.4, g: 0.7, b: 0.9 }, // Cyan
      { r: 0.6, g: 0.5, b: 0.9 }, // Purple
      { r: 0.4, g: 0.9, b: 0.8 }, // Turquoise
    ];

    // Create morphing shapes
    const shapes: any[] = [];

    // Shape 1: Icosahedron
    const geo1 = new THREE.IcosahedronGeometry(6, 5);
    const mat1 = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.3,
      wireframe: false,
      shininess: 100,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(-12, 8, 0);
    scene.add(mesh1);
    shapes.push({ mesh: mesh1, material: mat1, speedX: 0.003, speedY: 0.002 });

    // Shape 2: Octahedron
    const geo2 = new THREE.OctahedronGeometry(7, 4);
    const mat2 = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.2,
      wireframe: false,
      shininess: 80,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(12, -6, -5);
    scene.add(mesh2);
    shapes.push({ mesh: mesh2, material: mat2, speedX: 0.004, speedY: 0.003 });

    // Shape 3: Tetrahedron
    const geo3 = new THREE.TetrahedronGeometry(8, 3);
    const mat3 = new THREE.MeshPhongMaterial({
      color: 0xa78bfa,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.25,
      wireframe: false,
      shininess: 90,
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    mesh3.position.set(0, -10, 8);
    scene.add(mesh3);
    shapes.push({ mesh: mesh3, material: mat3, speedX: 0.002, speedY: 0.004 });

    // Shape 4: Dodecahedron
    const geo4 = new THREE.DodecahedronGeometry(5, 2);
    const mat4 = new THREE.MeshPhongMaterial({
      color: 0xf472b6,
      emissive: 0xf472b6,
      emissiveIntensity: 0.2,
      wireframe: false,
      shininess: 85,
    });
    const mesh4 = new THREE.Mesh(geo4, mat4);
    mesh4.position.set(-10, -8, 10);
    scene.add(mesh4);
    shapes.push({
      mesh: mesh4,
      material: mat4,
      speedX: 0.0025,
      speedY: 0.0035,
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1.5, 150);
    pointLight1.position.set(40, 40, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.3, 150);
    pointLight2.position.set(-40, -40, 50);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa78bfa, 1, 150);
    pointLight3.position.set(0, 50, -30);
    scene.add(pointLight3);

    let mouseX = 0;
    let mouseY = 0;
    let colorIndex = 0;

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

      // Animate each shape
      shapes.forEach((shape, idx) => {
        const { mesh, material, speedX, speedY } = shape;

        // Rotation
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        mesh.rotation.z += speedX * 0.5;

        // Morphing color transition
        const colorPhase = (elapsed * 0.5 + idx) % (colors.length * 2);
        let color1, color2, lerp;

        if (colorPhase < colors.length) {
          color1 = colors[Math.floor(colorPhase)];
          color2 = colors[(Math.floor(colorPhase) + 1) % colors.length];
          lerp = colorPhase - Math.floor(colorPhase);
        } else {
          const reversePhase = colorPhase - colors.length;
          color2 = colors[Math.floor(reversePhase)];
          color1 = colors[(Math.floor(reversePhase) + 1) % colors.length];
          lerp = reversePhase - Math.floor(reversePhase);
        }

        // Interpolate between colors
        const r = color1.r + (color2.r - color1.r) * lerp;
        const g = color1.g + (color2.g - color1.g) * lerp;
        const b = color1.b + (color2.b - color1.b) * lerp;

        const hexColor = new THREE.Color(r, g, b);
        material.color.copy(hexColor);
        material.emissive.copy(hexColor);

        // Floating animation
        mesh.position.y += Math.sin(elapsed * 0.7 + idx) * 0.02;
        mesh.position.x += Math.cos(elapsed * 0.5 + idx) * 0.015;

        // Respond to mouse
        mesh.rotation.x += mouseY * 0.0005;
        mesh.rotation.y += mouseX * 0.0005;

        // Pulsing scale
        const scale = 1 + Math.sin(elapsed + idx) * 0.05;
        mesh.scale.set(scale, scale, scale);
      });

      // Update light positions slightly
      pointLight1.position.x = 40 + Math.cos(elapsed * 0.5) * 10;
      pointLight1.position.y = 40 + Math.sin(elapsed * 0.5) * 10;

      pointLight2.position.x = -40 + Math.sin(elapsed * 0.4) * 10;
      pointLight2.position.y = -40 + Math.cos(elapsed * 0.4) * 10;

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
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      geo4.dispose();
      mat1.dispose();
      mat2.dispose();
      mat3.dispose();
      mat4.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)",
      }}
    />
  );
}
