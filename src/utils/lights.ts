import { greenFlash, initPattern, redFlash, yellowFlash } from "../patterns";
import { Instruction, TrafficLight } from "../types";

const { Red, Yellow, Green } = TrafficLight

const shuffle = (array: string[]) => (
  array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
)

export const generatePlaylist = () => {
  const lightPatterns = shuffle([ greenFlash, yellowFlash, redFlash ])
  return [ initPattern, ...lightPatterns ].flatMap(pattern => parseInstructions(pattern))
}

const parseInstructions = (input: string): Instruction[] => {
  const instructions: Instruction[] = []

  for (const line of input.split('\n')) {
    const parts = line.trim().split(/\s+/)

    if (parts.length < 2)
      continue

    const [ lightValue, lightDuration ] = parts

    if (!lightValue || !lightDuration)
      continue

    const mask = parseInt(lightValue, 10)
    const duration = parseInt(lightDuration, 10)

    const lights = [ Red, Yellow, Green ].filter(light => light & mask)
    const instruction = { lights, duration } as Instruction

    instructions.push(instruction)
  }

  return instructions
}

export const delay = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

