"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DMinimal() {
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
    renderer.domElement.style.filter = "blur(0.5px)";
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create soft gradient orbs (very subtle)
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Orb 1 - Indigo blur
    const orb1Geometry = new THREE.IcosahedronGeometry(15, 2);
    const orb1Material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.08,
      wireframe: false,
    });
    const orb1 = new THREE.Mesh(orb1Geometry, orb1Material);
    orb1.position.set(-20, 10, -10);
    orbGroup.add(orb1);

    // Orb 2 - Cyan blur
    const orb2Geometry = new THREE.IcosahedronGeometry(18, 2);
    const orb2Material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.06,
      wireframe: false,
    });
    const orb2 = new THREE.Mesh(orb2Geometry, orb2Material);
    orb2.position.set(20, -15, -8);
    orbGroup.add(orb2);

    // Orb 3 - Purple blur
    const orb3Geometry = new THREE.IcosahedronGeometry(20, 2);
    const orb3Material = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.05,
      wireframe: false,
    });
    const orb3 = new THREE.Mesh(orb3Geometry, orb3Material);
    orb3.position.set(0, 20, -15);
    orbGroup.add(orb3);

    // Orb 4 - Pink subtle glow
    const orb4Geometry = new THREE.IcosahedronGeometry(17, 2);
    const orb4Material = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.04,
      wireframe: false,
    });
    const orb4 = new THREE.Mesh(orb4Geometry, orb4Material);
    orb4.position.set(-25, -20, -12);
    orbGroup.add(orb4);

    // Create subtle animated plane with gradient
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Create gradient texture
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.05)");
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
    gradient.addColorStop(1, "rgba(167, 139, 250, 0.05)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -20;
    scene.add(plane);

    // Minimal lighting - just for subtle depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop - very subtle
    const startTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.0003; // Very slow animation

      // Extremely subtle orb movement
      orb1.position.y += Math.sin(elapsed + 0) * 0.008;
      orb1.position.x += Math.cos(elapsed + 0) * 0.005;

      orb2.position.y += Math.sin(elapsed + 1) * 0.007;
      orb2.position.x += Math.cos(elapsed + 1) * 0.006;

      orb3.position.y += Math.sin(elapsed + 2) * 0.009;
      orb3.position.x += Math.cos(elapsed + 2) * 0.004;

      orb4.position.y += Math.sin(elapsed + 3) * 0.006;
      orb4.position.x += Math.cos(elapsed + 3) * 0.007;

      // Very subtle opacity pulse
      const opacityPulse = Math.sin(elapsed * 0.5) * 0.02;
      orb1Material.opacity = 0.08 + opacityPulse;
      orb2Material.opacity = 0.06 + opacityPulse;
      orb3Material.opacity = 0.05 + opacityPulse;
      orb4Material.opacity = 0.04 + opacityPulse;

      // Minimal response to mouse
      orbGroup.position.x = mouseX * 1;
      orbGroup.position.y = mouseY * 1;

      // Very subtle rotation
      orbGroup.rotation.z += 0.00001;

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
      orb1Geometry.dispose();
      orb2Geometry.dispose();
      orb3Geometry.dispose();
      orb4Geometry.dispose();
      orb1Material.dispose();
      orb2Material.dispose();
      orb3Material.dispose();
      orb4Material.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)",
        filter: "blur(1px)",
      }}
    />
  );
}
