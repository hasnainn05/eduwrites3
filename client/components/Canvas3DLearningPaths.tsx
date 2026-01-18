"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Canvas3DLearningPaths() {
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

    // Create flowing path curves using Catmull-Rom curves
    const pathGroup = new THREE.Group();
    scene.add(pathGroup);

    const createFlowingPath = (
      controlPoints: THREE.Vector3[],
      color: THREE.Color,
      intensity = 1,
    ) => {
      const curve = new THREE.CatmullRomCurve3(controlPoints);
      const points = curve.getPoints(200);

      // Create tube geometry for smooth flowing path
      const pathGeometry = new THREE.TubeGeometry(
        new THREE.LineCurve3(points[0], points[points.length - 1]),
        32,
        0.4,
        8,
        false,
      );

      // Create custom path using buffer geometry
      const positions = new Float32Array(points.length * 3);
      points.forEach((point, idx) => {
        positions[idx * 3] = point.x;
        positions[idx * 3 + 1] = point.y;
        positions[idx * 3 + 2] = point.z;
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 3,
        transparent: true,
        opacity: 0.7,
      });

      const line = new THREE.Line(geometry, material);
      pathGroup.add(line);

      // Add glowing sphere nodes along the path
      const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        shininess: 100,
      });

      const nodes: THREE.Mesh[] = [];
      const nodeInterval = Math.floor(points.length / 5);

      for (let i = 0; i < points.length; i += nodeInterval) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(points[i]);
        pathGroup.add(node);
        nodes.push(node);
      }

      return {
        line,
        nodes,
        points,
        color,
        material,
        nodeGeometry,
        nodeMaterial,
      };
    };

    // Define learning path control points
    const learningPaths = [
      {
        points: [
          new THREE.Vector3(-25, 15, -10),
          new THREE.Vector3(-10, 10, 5),
          new THREE.Vector3(0, 5, 15),
          new THREE.Vector3(15, 0, 10),
          new THREE.Vector3(25, -10, 0),
        ],
        color: new THREE.Color(0x06b6d4), // Cyan
      },
      {
        points: [
          new THREE.Vector3(-20, -15, 5),
          new THREE.Vector3(-5, -8, -10),
          new THREE.Vector3(8, -5, -20),
          new THREE.Vector3(20, 0, -15),
          new THREE.Vector3(28, 10, -5),
        ],
        color: new THREE.Color(0x6366f1), // Indigo
      },
      {
        points: [
          new THREE.Vector3(0, 20, -15),
          new THREE.Vector3(10, 15, -5),
          new THREE.Vector3(15, 5, 10),
          new THREE.Vector3(10, -10, 15),
          new THREE.Vector3(-5, -15, 10),
        ],
        color: new THREE.Color(0xa78bfa), // Purple
      },
      {
        points: [
          new THREE.Vector3(-15, 5, 20),
          new THREE.Vector3(-8, 10, 10),
          new THREE.Vector3(0, 12, 0),
          new THREE.Vector3(12, 8, -10),
          new THREE.Vector3(18, -5, -15),
        ],
        color: new THREE.Color(0xf472b6), // Pink
      },
    ];

    const paths = learningPaths.map((pathData) =>
      createFlowingPath(pathData.points, pathData.color),
    );

    // Create flowing particles along paths
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const createPathParticles = (
      pathPoints: THREE.Vector3[],
      color: THREE.Color,
    ) => {
      const particles: any[] = [];
      const particleCount = 8;

      for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.2, 8, 8);
        const material = new THREE.MeshPhongMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.8,
        });
        const particle = new THREE.Mesh(geometry, material);
        particleGroup.add(particle);

        particles.push({
          mesh: particle,
          pathPoints,
          progress: i / particleCount,
          color,
        });
      }

      return particles;
    };

    const pathParticles: any[] = [];
    paths.forEach((path, idx) => {
      const particles = createPathParticles(
        path.points,
        learningPaths[idx].color,
      );
      pathParticles.push(...particles);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 150);
    pointLight1.position.set(50, 50, 60);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366f1, 1.2, 150);
    pointLight2.position.set(-50, -50, 60);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa78bfa, 0.8, 120);
    pointLight3.position.set(0, 60, -40);
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

      // Rotate entire path group
      pathGroup.rotation.x += mouseY * 0.001;
      pathGroup.rotation.y += mouseX * 0.001;
      pathGroup.rotation.z += 0.0001;

      // Animate path nodes - pulsing effect
      paths.forEach((path, pathIdx) => {
        path.nodes.forEach((node, nodeIdx) => {
          const pulse =
            Math.sin(elapsed + pathIdx * 0.5 + nodeIdx * 0.3) * 0.4 + 0.8;
          node.scale.set(pulse, pulse, pulse);

          // Glow intensity change
          node.material.emissiveIntensity = pulse * 0.6;
        });

        // Line opacity pulse
        const linePulse = Math.sin(elapsed * 0.5 + pathIdx * 0.5) * 0.3 + 0.6;
        path.material.opacity = linePulse;
      });

      // Animate particles moving along paths
      pathParticles.forEach((particle, idx) => {
        const { mesh, pathPoints, color } = particle;

        // Update progress along path
        particle.progress = (particle.progress + 0.003 + idx * 0.0001) % 1;

        // Interpolate position along path
        const pathLength = pathPoints.length;
        const position = particle.progress * (pathLength - 1);
        const currentPoint = Math.floor(position);
        const nextPoint = Math.min(currentPoint + 1, pathLength - 1);
        const t = position - currentPoint;

        const p1 = pathPoints[currentPoint];
        const p2 = pathPoints[nextPoint];

        mesh.position.lerpVectors(p1, p2, t);

        // Glow effect
        const glow = Math.sin(elapsed * 2 + idx) * 0.3 + 0.7;
        mesh.material.emissiveIntensity = glow;

        // Scale pulse
        const scale = Math.sin(elapsed + idx * 0.5) * 0.2 + 0.8;
        mesh.scale.set(scale, scale, scale);
      });

      // Animate light positions
      pointLight1.position.x = 50 + Math.cos(elapsed * 0.4) * 30;
      pointLight1.position.y = 50 + Math.sin(elapsed * 0.3) * 30;

      pointLight2.position.x = -50 + Math.sin(elapsed * 0.35) * 30;
      pointLight2.position.y = -50 + Math.cos(elapsed * 0.4) * 30;

      pointLight3.position.z = -40 + Math.sin(elapsed * 0.3) * 20;

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
      paths.forEach((path) => {
        path.line.geometry.dispose();
        path.line.material.dispose();
        path.nodes.forEach((node: THREE.Mesh) => {
          node.geometry.dispose();
          node.material.dispose();
        });
      });
      pathParticles.forEach((particle) => {
        particle.mesh.geometry.dispose();
        particle.mesh.material.dispose();
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
