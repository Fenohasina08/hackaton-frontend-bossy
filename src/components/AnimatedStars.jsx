import React, { useEffect, useRef } from "react";

const AnimatedStars = ({ isDark, color = "rgba(79, 70, 229, 0.8)" }) => {
  // couleur par défaut : indigo semi-transparent
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    const starCount = 100;

    // Ajuster la taille du canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random(),
        dOpacity: (Math.random() - 0.5) * 0.02,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    // Extraire les valeurs R, G, B de la couleur fournie
    const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    // Valeurs par défaut si la couleur n'est pas au format attendu
    const baseR = colorMatch ? parseInt(colorMatch[1]) : 255;
    const baseG = colorMatch ? parseInt(colorMatch[2]) : 255;
    const baseB = colorMatch ? parseInt(colorMatch[3]) : 255;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Mise à jour de la position
        star.x += star.dx;
        star.y += star.dy;

        // Rebonds sur les bords
        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;

        // Scintillement
        star.opacity += star.dOpacity;
        if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.dOpacity *= -1;
        }
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.dOpacity *= -1;
        }

        // Dessin
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${star.opacity.toFixed(2)})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, [isDark, color]); // redéclenche l'effet si la couleur change

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedStars;