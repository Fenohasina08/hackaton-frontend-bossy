import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x000000, 0.002); // Légère brume pour profondeur
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // ==================== GROUPES DE ROTATION ====================
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // ==================== GRAND CUBE GLASSMORPHISM CENTRAL ====================
    const glassCubeGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const glassCubeMaterial = new THREE.MeshPhysicalMaterial({
      color: '#06B6D4',
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      reflectivity: 0.5,
      emissive: '#06B6D4',
      emissiveIntensity: 0.15
    });
    
    const glassCube = new THREE.Mesh(glassCubeGeometry, glassCubeMaterial);
    glassCube.position.set(0, 0, -5);
    mainGroup.add(glassCube);
    
    // Wireframe autour du cube glass
    const wireframeGeometry = new THREE.BoxGeometry(2.55, 2.55, 2.55);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: '#06B6D4',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframeCube = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    glassCube.add(wireframeCube);

    // ==================== CUBES FLOTTANTS GLASSMORPHISM ====================
    const cubes = [];
    const cubeColors = ['#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];
    const cubePositions = [
      { x: -4, y: 2, z: -8, scale: 1.2, speed: 0.5 },
      { x: 5, y: -1, z: -10, scale: 1.0, speed: 0.7 },
      { x: -3, y: -2, z: -12, scale: 0.9, speed: 0.6 },
      { x: 4, y: 3, z: -7, scale: 1.1, speed: 0.8 },
      { x: -5, y: 4, z: -15, scale: 1.3, speed: 0.4 },
      { x: 6, y: -3, z: -9, scale: 0.8, speed: 0.9 },
      { x: -2, y: -4, z: -18, scale: 1.4, speed: 0.5 },
      { x: 3, y: 5, z: -11, scale: 1.0, speed: 0.6 }
    ];
    
    cubePositions.forEach((pos, index) => {
      const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
      const cubeMat = new THREE.MeshPhysicalMaterial({
        color: cubeColors[index % cubeColors.length],
        metalness: 0.8,
        roughness: 0.3,
        transparent: true,
        opacity: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        reflectivity: 0.6,
        emissive: cubeColors[index % cubeColors.length],
        emissiveIntensity: 0.1
      });
      
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(pos.x, pos.y, pos.z);
      cube.scale.set(pos.scale, pos.scale, pos.scale);
      cube.userData = {
        originalY: pos.y,
        speed: pos.speed,
        rotationSpeed: 0.002 + Math.random() * 0.003,
        floatSpeed: 0.5 + Math.random() * 0.5,
        color: cubeColors[index % cubeColors.length]
      };
      
      // Ajouter une wireframe fine à chaque cube
      const cubeWireGeo = new THREE.BoxGeometry(1.05, 1.05, 1.05);
      const cubeWireMat = new THREE.MeshBasicMaterial({
        color: cubeColors[index % cubeColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const cubeWire = new THREE.Mesh(cubeWireGeo, cubeWireMat);
      cube.add(cubeWire);
      
      mainGroup.add(cube);
      cubes.push(cube);
    });

    // ==================== ICOSAHEDRES (sphères facetées) GLASS ====================
    const icoGeometry = new THREE.IcosahedronGeometry(0.9, 0);
    const icoMaterial = new THREE.MeshPhysicalMaterial({
      color: '#EC4899',
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.4,
      clearcoat: 1,
      emissive: '#EC4899',
      emissiveIntensity: 0.12
    });
    
    const icoPositions = [
      { x: -6, y: 3, z: -14, scale: 0.8 },
      { x: 7, y: -2, z: -13, scale: 0.7 },
      { x: -4, y: -3, z: -20, scale: 0.9 },
      { x: 5, y: 4, z: -16, scale: 0.75 }
    ];
    
    const icos = [];
    icoPositions.forEach(pos => {
      const ico = new THREE.Mesh(icoGeometry, icoMaterial.clone());
      ico.position.set(pos.x, pos.y, pos.z);
      ico.scale.set(pos.scale, pos.scale, pos.scale);
      ico.userData = {
        originalY: pos.y,
        rotationSpeed: 0.001 + Math.random() * 0.002
      };
      mainGroup.add(ico);
      icos.push(ico);
    });

    // ==================== TORE (anneau) GLASS ====================
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.15, 64, 200);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: '#F59E0B',
      metalness: 0.95,
      roughness: 0.2,
      transparent: true,
      opacity: 0.45,
      clearcoat: 1,
      emissive: '#F59E0B',
      emissiveIntensity: 0.15
    });
    
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, -2, -12);
    torus.scale.set(1.2, 1.2, 1.2);
    mainGroup.add(torus);
    
    const torus2 = new THREE.Mesh(torusGeometry, torusMaterial.clone());
    torus2.position.set(-3, 3, -16);
    torus2.scale.set(0.8, 0.8, 0.8);
    mainGroup.add(torus2);

    // ==================== PETITES SPHÈRES FLOTTANTES ====================
    const smallSpheres = [];
    const sphereCount = 80;
    const sphereGeometry_small = new THREE.SphereGeometry(0.12, 16, 16);
    
    for (let i = 0; i < sphereCount; i++) {
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: cubeColors[i % cubeColors.length],
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
        emissive: cubeColors[i % cubeColors.length],
        emissiveIntensity: 0.2
      });
      
      const sphere = new THREE.Mesh(sphereGeometry_small, sphereMat);
      
      // Position aléatoire dans un volume
      sphere.position.x = (Math.random() - 0.5) * 18;
      sphere.position.y = (Math.random() - 0.5) * 12;
      sphere.position.z = (Math.random() - 0.5) * 20 - 10;
      
      sphere.userData = {
        originalX: sphere.position.x,
        originalY: sphere.position.y,
        originalZ: sphere.position.z,
        speedX: 0.001 + Math.random() * 0.002,
        speedY: 0.001 + Math.random() * 0.002,
        speedZ: 0.001 + Math.random() * 0.002,
        range: 0.5 + Math.random() * 1
      };
      
      floatingGroup.add(sphere);
      smallSpheres.push(sphere);
    }

    // ==================== PARTICULES FINES ====================
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: '#06B6D4',
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ==================== LUMIÈRES ====================
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060, 0.4);
    scene.add(ambientLight);
    
    // Directional lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);
    
    const dirLight2 = new THREE.DirectionalLight(0x06B6D4, 0.5);
    dirLight2.position.set(-5, 3, 10);
    scene.add(dirLight2);
    
    // Point lights colorées
    const coloredLights = [
      { color: '#06B6D4', pos: [3, 2, 5], intensity: 0.6 },
      { color: '#F59E0B', pos: [-3, -1, 6], intensity: 0.5 },
      { color: '#EC4899', pos: [0, 4, 4], intensity: 0.4 },
      { color: '#8B5CF6', pos: [4, -2, 7], intensity: 0.5 }
    ];
    
    const pointLights = coloredLights.map(light => {
      const pl = new THREE.PointLight(light.color, light.intensity, 20);
      pl.position.set(light.pos[0], light.pos[1], light.pos[2]);
      scene.add(pl);
      return pl;
    });
    
    // Back rim light
    const rimLight = new THREE.PointLight('#06B6D4', 0.4);
    rimLight.position.set(0, 0, -8);
    scene.add(rimLight);
    
    camera.position.z = 14;
    camera.position.y = 1;

    // ==================== ANIMATION ====================
    let time = 0;
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.008;
      
      // Rotation lente du groupe principal
      mainGroup.rotation.y = Math.sin(time * 0.1) * 0.2;
      mainGroup.rotation.x = Math.sin(time * 0.08) * 0.1;
      
      // Floating group rotation
      floatingGroup.rotation.y = time * 0.03;
      floatingGroup.rotation.x = time * 0.02;
      
      // Animation du cube central
      glassCube.rotation.x = Math.sin(time * 0.3) * 0.3;
      glassCube.rotation.y = Math.sin(time * 0.5) * 0.4;
      glassCube.rotation.z = Math.sin(time * 0.2) * 0.2;
      
      // Animation des cubes flottants
      cubes.forEach((cube, index) => {
        // Rotation individuelle
        cube.rotation.x += cube.userData.rotationSpeed;
        cube.rotation.y += cube.userData.rotationSpeed * 1.3;
        cube.rotation.z += cube.userData.rotationSpeed * 0.7;
        
        // Mouvement vertical lent
        cube.position.y = cube.userData.originalY + 
          Math.sin(time * cube.userData.floatSpeed + index) * 0.3;
        
        // Changement d'opacité subtil
        const opacity = 0.35 + Math.sin(time * 1.5 + index) * 0.1;
        cube.material.opacity = opacity;
        if (cube.children[0]) cube.children[0].material.opacity = opacity * 0.6;
      });
      
      // Animation des icosahedres
      icos.forEach((ico, index) => {
        ico.rotation.x += ico.userData.rotationSpeed;
        ico.rotation.y += ico.userData.rotationSpeed * 1.5;
        ico.rotation.z += ico.userData.rotationSpeed * 0.8;
        
        ico.position.y = ico.userData.originalY + 
          Math.sin(time * 0.8 + index) * 0.2;
      });
      
      // Animation des tores
      torus.rotation.x += 0.008;
      torus.rotation.z += 0.005;
      torus2.rotation.y += 0.006;
      torus2.rotation.x += 0.004;
      
      // Animation des petites sphères
      smallSpheres.forEach((sphere, index) => {
        sphere.position.x = sphere.userData.originalX + 
          Math.sin(time * sphere.userData.speedX * 10 + index) * sphere.userData.range * 0.3;
        sphere.position.y = sphere.userData.originalY + 
          Math.sin(time * sphere.userData.speedY * 8 + index * 2) * sphere.userData.range * 0.3;
        sphere.position.z = sphere.userData.originalZ + 
          Math.cos(time * sphere.userData.speedZ * 7 + index) * sphere.userData.range * 0.3;
      });
      
      // Rotation des particules
      particles.rotation.y = time * 0.02;
      particles.rotation.x = time * 0.01;
      
      // Animation des lumières
      pointLights.forEach((light, index) => {
        light.intensity = 0.4 + Math.sin(time * 1.5 + index) * 0.3;
      });
      
      rimLight.intensity = 0.3 + Math.sin(time * 1.2) * 0.2;
      
      // Changement subtil de la couleur du cube central
      const hue = (time * 0.05) % 1;
      glassCube.material.emissiveIntensity = 0.15 + Math.sin(time) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // ==================== HANDLE RESIZE ====================
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // ==================== THEME CHANGE ====================
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          const newColor = isDark ? '#06B6D4' : '#3B82F6';
          particleMaterial.color.set(newColor);
          dirLight2.color.set(newColor);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // ==================== CLEANUP ====================
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      
      // Cleanup Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default ThreeBackground;