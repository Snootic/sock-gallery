import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PlayerCamera } from '../../components/player/camera';
import PlayerBody from '../../components/player/body';
import { useCollision } from '../collision';

export function usePlayer(initialPosition: [number, number, number]) {
  const playerBody = useRef<PlayerBody>(null);
  const playerCamera = useRef<PlayerCamera>(null);
  const checkCollision = useCollision()

  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(...initialPosition));
  const [velocityY, setVelocityY] = useState<number>(0)

  const keys = useRef<{ [key: string]: boolean }>({
    w: false, a: false, s: false, d: false, space: false, Shift: false,
  }).current;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key === ' ' ? 'space' : e.key;
      if (key in keys) keys[key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key === ' ' ? 'space' : e.key;
      if (key in keys) keys[key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  useFrame(() => {
    if (!playerBody.current || !playerCamera.current) return;

    const camera = playerCamera.current;
    const body = playerBody.current
    const moveVector = new THREE.Vector3();
    camera.getWorldDirection(camera.facingDirection);

    let moveSpeed = 0.07;
    if (keys.Shift) moveSpeed *= 2;

    const forward = new THREE.Vector3().copy(camera.facingDirection);
    const right = new THREE.Vector3()
    .copy(camera.facingDirection)
    .cross(camera.up);
  
    if (keys.w) moveVector.add(forward);
    if (keys.s) moveVector.sub(forward);
    if (keys.a) moveVector.sub(right);
    if (keys.d) moveVector.add(right);

    setVelocityY(velocityY - 0.01);

    moveVector.normalize().multiplyScalar(moveSpeed);
    moveVector.y = velocityY;

    const collided = checkCollision(body);
    let isOnGround = false;
    if (collided.length > 0) {
      collided.forEach((normal) => {
        if (normal.y > 0.7) {
          isOnGround = true;
        }
        const projection = moveVector.dot(normal);
        if (projection < 0) {
          moveVector.sub(normal.clone().multiplyScalar(projection));
        }
      });
    }

    if (keys.space && isOnGround) setVelocityY(0.2)
    
    const newPos = playerPosition.clone().add(moveVector);

    if (newPos.y < -100) {
      newPos.set(0, 3, 0);
    }

    setPlayerPosition(newPos);

    playerBody.current.position.copy(newPos);
    camera.position.copy(newPos);
  });

  return { playerBody, playerCamera, playerPosition };
}