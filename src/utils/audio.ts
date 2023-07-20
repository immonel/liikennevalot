import { useState, useEffect } from "react";

export const useAudio = (url: string) => {
  const [ audio ] = useState(new Audio(url));
  const [ playing, setPlaying ] = useState(false);

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
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [ play, stop ] as const;
};