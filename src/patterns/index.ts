import { TrafficLight } from "../types"

const { Red, Yellow, Green, Off } = TrafficLight

const repeat = (pattern: string, times: number) =>
  Array(times).fill(pattern).join('\n') + '\n'

export const initPattern =
`
${repeat(`
  ${Red}                100
  ${Yellow}             100
  ${Green}              100
`, 3)}
${Red}                  1000
${Red | Yellow}         1000
${Red | Yellow | Green} 1000
${Off}                  4000
`

const lightFlashPattern = (lights: TrafficLight) => (
  `
  ${lights} 5000
  ${Off} 500
  ${repeat(`${lights} 500 \n ${Off} 500`, 3)}
  ${repeat(`${lights} 250 \n ${Off} 250`, 4)}
  ${repeat(`${lights} 125 \n ${Off} 125`, 8)}
  `
)

export const greenFlash  = lightFlashPattern(Green)
export const yellowFlash = lightFlashPattern(Yellow)
export const redFlash    = lightFlashPattern(Red)
