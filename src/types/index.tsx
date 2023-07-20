export enum TrafficLight {
  Red    = 0b100,
  Yellow = 0b010,
  Green  = 0b001,
  Off    = 0b000
}

export type Instruction = {
  lights: TrafficLight[],
  duration: number
}