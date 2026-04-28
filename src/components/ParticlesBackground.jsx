import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---- Scene, Camera, Renderer ----
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // fond profond (slate-900)

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // perf
    mount.appendChild(renderer.domElement);

    // ---- Particules ----
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // positions aléatoires dans un cube [-4,4] en x,y,z
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4;

      // couleurs pastel (cyan, indigo, blanc)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.4; colors[i+1] = 0.8; colors[i+2] = 1.0; // cyan
      } else if (colorChoice < 0.66) {
        colors[i] = 0.6; colors[i+1] = 0.5; colors[i+2] = 1.0; // indigo
      } else {
        colors[i] = 0.9; colors[i+1] = 0.9; colors[i+2] = 1.0; // blanc
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ---- Animation ----
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // rotation lente
      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0003;

      // léger déplacement de la caméra pour effet de profondeur
      // (optionnel)
      // camera.position.x = Math.sin(Date.now() * 0.0001) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // ---- Redimensionnement ----
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ---- Nettoyage ----
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ParticleBackground;