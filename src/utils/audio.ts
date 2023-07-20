import { useState, useEffect } from "react";

export const useAudio = (url: string, callback: () => void) => {
  const [ audio ] = useState(new Audio(url));
  const [ playing, setPlaying ] = useState(false);

  const audioEndedCallback = () => {
    setPlaying(false)
    callback()
  }

  const play = () => {
    void audio.play();
    setPlaying(true)
  }

  const stop = () => {
    audio.pause()
    audio.currentTime = 0
    setPlaying(false)
  }

  useEffect(() => {
    playing
      ? play()
      : stop();
    }, [ playing ]
  );

  useEffect(() => {
    audio.addEventListener('ended', audioEndedCallback);
    return () => {
      audio.removeEventListener('ended', audioEndedCallback);
    };
  }, []);

  return [ play, stop ] as const;
};