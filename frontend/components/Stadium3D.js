"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// Reusable Curved Stand Component for the Bowl
function CurvedStand({ radiusTop, radiusBottom, height, thetaStart, thetaLength, density, name }) {
  // Heatmap Color Logic
  let color = "#00ff88"; // Normal (Green)
  if (density > 60) color = "#ffd700"; // Medium (Yellow)
  if (density > 85) color = "#ff3366"; // Overloaded (Red)

  return (
    <group position={[0, height / 2, 0]}>
      {/* Outer Structure / Concrete */}
      <mesh>
        <cylinderGeometry args={[radiusTop + 0.5, radiusBottom + 0.5, height, 32, 1, true, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#111118" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Seating Area Glow (Heatmap) */}
      <mesh>
        <cylinderGeometry args={[radiusTop, radiusBottom, height, 32, 1, true, thetaStart, thetaLength]} />
        <meshStandardMaterial color={color} transparent opacity={0.3 + (density / 150)} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Particle System for Fake Static Crowd
function StaticCrowd({ count = 500, radiusMax = 20 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.45 + 0.55; 
      const x = Math.cos(angle) * radiusMax * r;
      const z = Math.sin(angle) * radiusMax * r;
      let y = 0.5;
      if (r > 0.5) y = ((r - 0.5) / 0.5) * 12 + 0.5;
      temp.push({ x, y, z });
    }
    return temp;
  }, [count, radiusMax]);

  useEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      particles.forEach((particle, i) => {
        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [particles]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
    </instancedMesh>
  );
}

function Pitch() {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Grass Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0b2c11" roughness={0.8} />
      </mesh>
      {/* Center Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3, 3.2, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      {/* Halfway line */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[20, 0.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      {/* Penalty boxes */}
      <mesh position={[0, 0.01, 7]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh position={[0, 0.01, -7]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
}

function CameraSetup({ focusedZone }) {
  const { camera } = useThree();
  useEffect(() => {
    if (focusedZone) {
      camera.position.set(0, 5, 0); // Position on the pitch
    } else {
      camera.position.set(0, 40, 30); // Default overhead
    }
  }, [focusedZone, camera]);
  return null;
}

// Main 3D Component
export default function Stadium3D({ stadiumState, focusedZone }) {
  const getZoneDensity = (zoneId) => {
    const zone = stadiumState?.zones?.find(z => z.id === zoneId);
    return zone ? zone.density : 0;
  };

  const radiusTop = 22;
  const radiusBottom = 12;
  const height = 12;

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 40, 30], fov: 60 }}>
        <CameraSetup focusedZone={focusedZone} />
        <color attach="background" args={["#030305"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[20, 40, 20]} intensity={1.5} color="#e0e5ff" castShadow />
        
        {/* Stadium Lights (Glow) */}
        <pointLight position={[0, 15, 0]} intensity={1.5} color="#00f0ff" distance={60} />
        
        {/* The Entire Stadium scaled to be an oval (Football/Cricket shape) */}
        <group scale={[1, 1, 1.4]}>
          
          <Pitch />

          {/* Halo Roof Ring */}
          <mesh position={[0, height + 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radiusTop, 0.6, 16, 64]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
          </mesh>
          
          {/* Inner Canopy */}
          <mesh position={[0, height + 0.2, 0]}>
             <cylinderGeometry args={[radiusTop - 3, radiusTop + 0.5, 0.2, 64, 1, true]} />
             <meshStandardMaterial color="#111118" side={THREE.DoubleSide} />
          </mesh>

          {/* Stands - divided into 4 heatmap zones */}
          {/* East Stand (C) */}
          <CurvedStand radiusTop={radiusTop} radiusBottom={radiusBottom} height={height} 
            thetaStart={-Math.PI / 4} thetaLength={Math.PI / 2} density={getZoneDensity('C')} name="East" />
          
          {/* North Stand (A) */}
          <CurvedStand radiusTop={radiusTop} radiusBottom={radiusBottom} height={height} 
            thetaStart={Math.PI / 4} thetaLength={Math.PI / 2} density={getZoneDensity('A')} name="North" />
          
          {/* West Stand (D) */}
          <CurvedStand radiusTop={radiusTop} radiusBottom={radiusBottom} height={height} 
            thetaStart={3 * Math.PI / 4} thetaLength={Math.PI / 2} density={getZoneDensity('D')} name="West" />
          
          {/* South Stand (B) */}
          <CurvedStand radiusTop={radiusTop} radiusBottom={radiusBottom} height={height} 
            thetaStart={5 * Math.PI / 4} thetaLength={Math.PI / 2} density={getZoneDensity('B')} name="South" />

          {/* Static Crowd Particles (Admin View) */}
          <StaticCrowd count={stadiumState?.totalPeople ? Math.min(3000, stadiumState.totalPeople / 40) : 1000} radiusMax={radiusTop} />

        </group>

        <OrbitControls 
          target={
            focusedZone === 'A' ? [0, 10, 20] : 
            focusedZone === 'B' ? [0, 10, -20] : 
            focusedZone === 'C' ? [20, 10, 0] : 
            focusedZone === 'D' ? [-20, 10, 0] : 
            [0, 0, 0]
          }
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 6}
          minDistance={20}
          maxDistance={80}
          autoRotate={false}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
