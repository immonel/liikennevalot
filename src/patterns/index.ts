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
${Red}                  900
${Red | Yellow}         900
${Red | Yellow | Green} 1600
${Off}                  3500
`

const lightFlashPattern = (lights: TrafficLight) => (
  `
  ${lights} 4900
  ${Off} 500
  ${repeat(`${lights} 500 \n ${Off} 500`, 3)}
  ${repeat(`${lights} 250 \n ${Off} 250`, 4)}
  ${repeat(`${lights} 125 \n ${Off} 125`, 8)}
  `
)

export const greenFlash  = lightFlashPattern(Green)
export const yellowFlash = lightFlashPattern(Yellow)
export const redFlash    = lightFlashPattern(Red)
