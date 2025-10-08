import { useState, useEffect } from "react";

export const useAudio = (url: string, callback: () => void) => {
  const [ audio ] = useState(() => {
    const audioElement = new Audio(url);
    audioElement.preload = 'auto';
    audioElement.load();
    return audioElement;
  });
  const [ playing, setPlaying ] = useState(false);

  const audioEndedCallback = () => {
    setPlaying(false)
    callback()
  }

  const play = (playbackRate = 1) => {
    audio.playbackRate = playbackRate
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
      ? play(audio.playbackRate)
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