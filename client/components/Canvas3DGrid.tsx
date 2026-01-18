"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gridRef = useRef<THREE.Group | null>(null);

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
    camera.position.z = 40;
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

    // Create grid group
    const gridGroup = new THREE.Group();
    gridRef.current = gridGroup;
    scene.add(gridGroup);

    // Create lattice grid
    const gridSize = 20;
    const spacing = 4;
    const nodeGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.3,
    });

    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    // Create nodes
    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let y = -gridSize; y <= gridSize; y += spacing) {
        const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        nodeMesh.position.set(x, y, 0);
        gridGroup.add(nodeMesh);
        nodes.push(nodeMesh);
        nodePositions.push(new THREE.Vector3(x, y, 0));
      }
    }

    // Create lines connecting nodes
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lineIndices: number[] = [];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        // Connect only nearby nodes (within 2 spacing distance)
        if (dist < spacing * 2.1 && dist > 0.1) {
          const startIdx = linePositions.length / 3;
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z,
          );
          lineIndices.push(startIdx, startIdx + 1);
        }
      }
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3),
    );
    lineGeometry.setIndex(
      new THREE.BufferAttribute(new Uint32Array(lineIndices), 1),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      linewidth: 2,
      transparent: true,
      opacity: 0.6,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    gridGroup.add(lines);

    // Add some highlighted nodes
    const highlightGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const highlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.6,
    });

    const highlightIndices = [5, 12, 20, 31, 25];
    const highlightMeshes: THREE.Mesh[] = [];

    highlightIndices.forEach((idx) => {
      if (idx < nodes.length) {
        const highlightMesh = new THREE.Mesh(
          highlightGeometry,
          highlightMaterial,
        );
        highlightMesh.position.copy(nodes[idx].position);
        gridGroup.add(highlightMesh);
        highlightMeshes.push(highlightMesh);
      }
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 1.5, 100);
    pointLight1.position.set(30, 30, 40);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.2, 100);
    pointLight2.position.set(-30, -30, 40);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation based on mouse
      gridGroup.rotation.x += (targetRotationX - gridGroup.rotation.x) * 0.05;
      gridGroup.rotation.y += (targetRotationY - gridGroup.rotation.y) * 0.05;

      // Slight auto-rotation
      gridGroup.rotation.z += 0.0002;

      // Animate highlight nodes
      highlightMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.008;
        mesh.position.z = Math.sin(performance.now() * 0.001 + idx) * 3;
      });

      // Pulse the lines opacity
      const pulse = Math.sin(performance.now() * 0.001) * 0.2 + 0.5;
      (lineMaterial as any).opacity = pulse;

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
      nodeGeometry.dispose();
      highlightGeometry.dispose();
      nodeMaterial.dispose();
      highlightMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)",
      }}
    />
  );
}
