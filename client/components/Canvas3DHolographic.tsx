"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DHolographic() {
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
    camera.position.z = 50;
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

    // Create holographic line patterns
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Helper function to create glowing line
    const createGlowingLine = (
      start: THREE.Vector3,
      end: THREE.Vector3,
      color: THREE.Color,
      intensity = 1.5,
    ) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z]),
          3,
        ),
      );

      const material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 2,
        transparent: true,
        opacity: 0.8,
      });

      const line = new THREE.Line(geometry, material);
      lineGroup.add(line);

      return { line, geometry, material };
    };

    // Create holographic wave patterns
    const createWavePattern = () => {
      const waves: any[] = [];
      const waveCount = 5;
      const colors = [
        new THREE.Color(0x06b6d4), // Cyan
        new THREE.Color(0x6366f1), // Indigo
        new THREE.Color(0xa78bfa), // Purple
        new THREE.Color(0xf472b6), // Pink
      ];

      for (let w = 0; w < waveCount; w++) {
        const waveLines: any[] = [];
        const pointCount = 30;
        const color = colors[w % colors.length];
        const radius = 8 + w * 4;

        for (let i = 0; i < pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2;
          const nextAngle = ((i + 1) / pointCount) * Math.PI * 2;

          const start = new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.5,
            Math.sin(angle * 2) * 10,
          );

          const end = new THREE.Vector3(
            Math.cos(nextAngle) * radius,
            Math.sin(nextAngle) * radius * 0.5,
            Math.sin(nextAngle * 2) * 10,
          );

          const lineObj = createGlowingLine(start, end, color);
          waveLines.push(lineObj);
        }

        waves.push({
          lines: waveLines,
          radius,
          color,
          rotationSpeed: 0.005 + w * 0.001,
        });
      }

      return waves;
    };

    const waves = createWavePattern();

    // Create geometric grid lines
    const createGridLines = () => {
      const gridLines: any[] = [];
      const gridSize = 30;
      const spacing = 10;
      const gridColor = new THREE.Color(0x06b6d4);
      const hsl = gridColor.getHSL({ h: 0, s: 0, l: 0 });
      gridColor.setHSL(hsl.h, hsl.s, 0.6);

      // Horizontal lines
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        const start = new THREE.Vector3(-gridSize, 0, z);
        const end = new THREE.Vector3(gridSize, 0, z);
        const lineObj = createGlowingLine(start, end, gridColor, 0.5);
        gridLines.push(lineObj);
      }

      // Vertical lines
      for (let x = -gridSize; x <= gridSize; x += spacing) {
        const start = new THREE.Vector3(x, -gridSize * 0.3, -gridSize);
        const end = new THREE.Vector3(x, gridSize * 0.3, gridSize);
        const lineObj = createGlowingLine(start, end, gridColor, 0.5);
        gridLines.push(lineObj);
      }

      return gridLines;
    };

    const gridLines = createGridLines();

    // Create glowing points at line intersections
    const pointGeometry = new THREE.BufferGeometry();
    const pointPositions: number[] = [];
    const gridSize = 30;
    const spacing = 10;

    for (let z = -gridSize; z <= gridSize; z += spacing) {
      for (let x = -gridSize; x <= gridSize; x += spacing) {
        pointPositions.push(x, 0, z);
      }
    }

    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pointPositions), 3),
    );
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    lineGroup.add(points);

    // Add glow postprocessing via lighting
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2, 200);
    pointLight1.position.set(60, 60, 60);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa78bfa, 1.5, 200);
    pointLight2.position.set(-60, -60, 60);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf472b6, 1, 200);
    pointLight3.position.set(0, 0, 80);
    scene.add(pointLight3);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.3;
      targetRotationX = mouseY * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = performance.now() * 0.001;

      // Rotate main group based on mouse
      lineGroup.rotation.x += (targetRotationX - lineGroup.rotation.x) * 0.05;
      lineGroup.rotation.y += (targetRotationY - lineGroup.rotation.y) * 0.05;

      // Auto rotation
      lineGroup.rotation.z += 0.0001;

      // Animate wave patterns
      waves.forEach((wave, idx) => {
        wave.lines.forEach((lineObj: any, lineIdx: number) => {
          const pulse =
            Math.sin(elapsed + idx * 0.5 + lineIdx * 0.1) * 0.3 + 0.6;
          lineObj.material.opacity = pulse;
        });

        // Rotate and scale waves
        const waveRotation = elapsed * wave.rotationSpeed;
        wave.lines.forEach((lineObj: any, lineIdx: number) => {
          const angle =
            (lineIdx / wave.lines.length) * Math.PI * 2 + waveRotation;
          const nextAngle = angle + (1 / wave.lines.length) * Math.PI * 2;

          const posArray = lineObj.geometry.attributes.position
            .array as Float32Array;
          const radius = wave.radius;

          posArray[0] = Math.cos(angle) * radius;
          posArray[1] = Math.sin(angle) * radius * 0.5;
          posArray[2] = Math.sin(angle * 2) * 10;

          posArray[3] = Math.cos(nextAngle) * radius;
          posArray[4] = Math.sin(nextAngle) * radius * 0.5;
          posArray[5] = Math.sin(nextAngle * 2) * 10;

          (lineObj.geometry.attributes.position as any).needsUpdate = true;
        });
      });

      // Pulse grid lines and points
      const gridPulse = Math.sin(elapsed * 0.5) * 0.4 + 0.5;
      gridLines.forEach((lineObj: any) => {
        lineObj.material.opacity = gridPulse * 0.6;
      });
      (pointMaterial as any).opacity = gridPulse * 0.8;

      // Animate light positions
      pointLight1.position.x = 60 + Math.cos(elapsed * 0.3) * 30;
      pointLight1.position.y = 60 + Math.sin(elapsed * 0.4) * 30;

      pointLight2.position.x = -60 + Math.sin(elapsed * 0.25) * 30;
      pointLight2.position.y = -60 + Math.cos(elapsed * 0.35) * 30;

      pointLight3.position.z = 80 + Math.sin(elapsed * 0.3) * 20;

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
      pointGeometry.dispose();
      pointMaterial.dispose();
      waves.forEach((wave) => {
        wave.lines.forEach((lineObj: any) => {
          lineObj.geometry.dispose();
          lineObj.material.dispose();
        });
      });
      gridLines.forEach((lineObj: any) => {
        lineObj.geometry.dispose();
        lineObj.material.dispose();
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
          "radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)",
      }}
    />
  );
}
