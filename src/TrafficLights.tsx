import { useState } from "react"
import { TrafficLight } from "./types"
import redLight from './assets/redLight.svg'
import yellowLight from './assets/yellowLight.svg'
import greenLight from './assets/greenLight.svg'
import trafficLights from './assets/trafficLights.svg'
import { delay, generatePlaylist } from "./utils/lights"
import { useAudio } from "./utils/audio"
import pizzaTheme from './assets/pizzatheme.mp3'
import WebApp from "@twa-dev/sdk"

const { Red, Yellow, Green, Off } = TrafficLight

const TrafficLights = () => {
  const [ state,     setState    ] = useState(Off)
  const [ playing,   setPlaying  ] = useState(false)

  const audioEndedCallback = () => setPlaying(false)
  const [ playMusic, stopMusic ] = useAudio(pizzaTheme, audioEndedCallback)

  // const toggleColor = (color: TrafficLight) => (
  //   setState(state ^ color)
  // )

  const setColors = (lights: TrafficLight[]) => (
    setState(lights.reduce((previous, light) => previous | light, Off))
  )

  const play = async () => {
    const instructions = generatePlaylist()
    // Playback speed 1-1.5x
    const playbackRate = 1 + ( Math.random() / 2 )
    console.log('Setting playback rate to', playbackRate)
    setPlaying(true)
    playMusic(playbackRate)

    for (const instruction of instructions) {
      const lights = instruction.lights
      const duration = instruction.duration
      setColors(lights)
      await delay(duration / playbackRate)
    }
    setState(Off)
  }

  const stop = () => {
    stopMusic()
    setState(Off)
    setPlaying(false)
    // TODO: Implement proper stopping
    window.location.reload()
  }

  const togglePlaying = () => {
    WebApp.HapticFeedback.impactOccurred('rigid')
    playing
      ? stop()
      : void play()
  }

  return (
    // <>
    <button className="bg-transparent hover:border-transparent" onClick={togglePlaying}>
      <div className="w-[300px] relative flex justify-center align-middle">
          <img className="relative" src={trafficLights}></img>
          { Boolean(state & Red)    && <img className="absolute w-[66px] top-[40px]"  src={redLight} />    }
          { Boolean(state & Yellow) && <img className="absolute w-[66px] top-[128px]" src={yellowLight} /> }
          { Boolean(state & Green)  && <img className="absolute w-[66px] top-[216px]" src={greenLight} />  }
      </div>
    </button>
    //   <div>
    //     <button onClick={() => toggleColor(Red)}>red</button>
    //     <button onClick={() => toggleColor(Yellow)}>yellow</button>
    //     <button onClick={() => toggleColor(Green)}>green</button>
    //   </div>
    // </>
  )
}

export default TrafficLights