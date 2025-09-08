import { useThree } from '@react-three/fiber'
import { useEffect, useRef, forwardRef, type ForwardedRef } from 'react'
import { Camera, Quaternion, Vector3 } from 'three';
import { PerspectiveCamera } from '@react-three/drei';

type CameraPosition = {
  x: number;
  y: number;
  z: number;
};

interface PlayerCameraProps {
  CameraPosition: CameraPosition;
}

export interface PlayerCamera extends Camera {
  facingDirection: Vector3
}
export const PlayerCamera = forwardRef(function PlayerCamera(
  { CameraPosition }: PlayerCameraProps,
  ref: ForwardedRef<any>
) {
  const cameraX = useRef(0)
  const cameraY = useRef(0)
  const { camera } = useThree();

  useEffect(() => {
    const cam = ref && typeof ref === 'object' && ref.current
      ? ref.current as PlayerCamera
      : (camera as unknown as PlayerCamera);
    cam.facingDirection = new Vector3()
    cam.position.set(CameraPosition.x, CameraPosition.y, CameraPosition.z)
  }, [CameraPosition, camera, ref])

  useEffect(() => {
    const cam = ref && typeof ref === 'object' && ref.current ? ref.current : camera;
    const handleMouseMove = (event: MouseEvent) => {
      cameraX.current += event.movementX * 0.025
      cameraY.current += event.movementY * 0.025

      cameraY.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraY.current))

      const quaternionY = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -cameraX.current)
      const quaternionX = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -cameraY.current)

      cam.quaternion.copy(quaternionY).multiply(quaternionX)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [camera, ref])

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[CameraPosition.x, CameraPosition.y, CameraPosition.z]}
      fov={75}
      near={0.1}
      far={1000}
    />
  )
})
