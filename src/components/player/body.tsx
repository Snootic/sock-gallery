import { forwardRef, type ForwardedRef } from 'react'
import type { Mesh } from 'three'
import { MeshObject } from '../MeshObject'

type PlayerBodyProps = {
  position: [number, number, number]
  color?: string
}

export interface PlayerBody extends Mesh {}

export const PlayerBody = forwardRef(function PlayerBody(
  { ...props }: PlayerBodyProps,
  ref: ForwardedRef<any>
) {
  return (
    <MeshObject
      ref={ref}
      position={props.position}
    >
      <boxGeometry args={[1, 1.5, 0.5]} />
      <meshStandardMaterial color={props.color} />
    </MeshObject>
  )
})

export default PlayerBody