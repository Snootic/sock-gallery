import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Quaternion, Vector3 } from 'three';

type CameraPosition = {
  x: number;
  y: number;
  z: number;
};

interface PlayerCameraProps {
  CameraPosition: CameraPosition;
}

export function PlayerCamera({ CameraPosition }: PlayerCameraProps) {
  const { camera } = useThree()
  const cameraX = useRef(0)
  const cameraY = useRef(0)

  useEffect(() => {
    camera.position.set(CameraPosition.x, CameraPosition.y, CameraPosition.z)
  }, [CameraPosition, camera])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cameraX.current += event.movementX * 0.002
      cameraY.current += event.movementY * 0.002

      cameraY.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraY.current))

      const quaternionY = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -cameraX.current)
      const quaternionX = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -cameraY.current)

      camera.quaternion.copy(quaternionY).multiply(quaternionX)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [camera])

  return null
}
