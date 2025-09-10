import type { Quaternion } from "three";

export type Player = {
  id: string
  position: [number, number, number];
  rotation?: Quaternion;
  color?: string
}