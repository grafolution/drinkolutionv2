"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useRouter } from "next/navigation";
import { Overlay, Title, Button } from "./components/StyledComponents.ts";

// ---------- 3D-Hintergrund (Torus Knots) ----------

// Eine einzelne Partikel-Komponente: Rotierender, kleinerer Torus Knot
const Particle = () => {
  const ref = useRef();
  // Reduziere den Bereich der Positionen, z. B. auf 10 anstatt 15
  const initialPosition = new Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  // Leicht angepasste Rotationsgeschwindigkeit
  const [rotationSpeed] = useState(Math.random() * 0.02 + 0.005);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed;
      ref.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} position={[initialPosition.x, initialPosition.y, initialPosition.z]}>
      {/* Kleinere Torus Knot-Parameter: kleinerer Radius und weniger Segmente */}
      <torusKnotGeometry args={[0.15, 0.04, 48, 8]} />
      <meshStandardMaterial
        color="#FF69B4"
        emissive="#FF1493"
        emissiveIntensity={1.0}
      />
    </mesh>
  );
};

const ParticlesField = () => {
  // Reduziere die Anzahl der Partikel, damit sie nicht den gesamten Hintergrund dominieren
  const particles = Array.from({ length: 80 }, (_, i) => <Particle key={i} />);
  return <>{particles}</>;
};

const ThreeDBackground = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // Sicherstellen, dass ein Hintergrund vorhanden ist
        background: "linear-gradient(135deg, #F0F8FF, #FFFACD)",
      }}
    >
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <ParticlesField />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

// ---------- Bierflaschen-Partikelfeld (Canvas) ----------

function drawBeerBottle(ctx, x, y, rotation = 0, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);

  // Schlagschatten für glattere Darstellung
  ctx.shadowColor = "rgba(0, 128, 0, 0.4)";
  ctx.shadowBlur = 4; // leicht reduziert
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000000"; // Schwarzer Rand
  ctx.fillStyle = "#eee";   // Neon-Grün

  ctx.beginPath();
  ctx.moveTo(-20, 40);
  ctx.quadraticCurveTo(0, 50, 20, 40);
  ctx.lineTo(20, -10);
  ctx.lineTo(10, -30);
  ctx.lineTo(10, -40);
  ctx.lineTo(-10, -40);
  ctx.lineTo(-10, -30);
  ctx.lineTo(-20, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000000";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.fillText("BIER", 0, 10);

  ctx.restore();
}

function BeerBottleParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particles = [];
    const numParticles = 48;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        scale: 0.8 + Math.random() * 0.6,
      });
    }

    let lastTime = performance.now();
    function animate(now) {
      const deltaTime = now - lastTime;
      lastTime = now;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx * (deltaTime / 16.67);
        p.y += p.vy * (deltaTime / 16.67);
        p.rotation += p.vr * (deltaTime / 16.67);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        drawBeerBottle(ctx, p.x, p.y, p.rotation, p.scale);
      });
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas  gl={{
                         antialias: true,
                         alpha: true,
                         powerPreference: "high-performance",
                       }} ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }}

                  >
                     <directionalLight position={[5, 5, 5]} intensity={0.6} />
                  </canvas>;
}

// ---------- Kombinierter Hintergrund ----------

const CombinedBackground = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      {/* Unterer Layer: 3D-Torus Knots */}
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <ThreeDBackground />
      </div>
      {/* Mittlerer Layer: Bierflaschen-Partikelfeld */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
        }}
      >
        <BeerBottleParticleField />
      </div>
    </div>
  );
};

// ---------- Home-Seite ----------

export default function Home() {
  const router = useRouter();

  const createGame = () => {
    router.push("/game");
  };

  const joinGame = () => {
    const gameId = prompt("Bitte gib die Spiel-ID ein:");
    if (gameId && gameId.trim() !== "") {
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <CombinedBackground />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            color: "#444",
            fontSize: "3rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Super Fancy Trinkspiel
        </h1>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={createGame}
            style={{
              pointerEvents: "auto",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#C4FF8C",
              cursor: "pointer",
            }}
          >
            Spiel starten
          </button>
          <button
            onClick={joinGame}
            style={{
              pointerEvents: "auto",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#C4FF8C",
              cursor: "pointer",
            }}
          >
            Spiel beitreten
          </button>
        </div>
      </div>
    </div>
  );
}
