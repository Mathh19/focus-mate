import { useContext } from 'react';
import playBellSound from '../sounds/play-bell-ding-long.mp3';
import restBellSound from '../sounds/rest-bell-ding.mp3';
import pauseSoundAudio from '../sounds/pause-sound.mp3';
import testBellSound from '../sounds/play-bell-ding-test.mp3';
import { PomodoroContext } from '../contexts/PomodoroContext/PomodoroContext';

const pauseSound = new Audio(pauseSoundAudio);
const playBell = new Audio(playBellSound);
const restBell = new Audio(restBellSound);
const testBell = new Audio(testBellSound);

export const useSound = () => {
  const { pomodoro } = useContext(PomodoroContext);
  const sounds = [pauseSound, playBell, restBell];

  sounds.map((sound) => {
    sound.volume = pomodoro.volume[0] / 100;
  });

  return {
    pauseSound,
    playBell,
    restBell,
    testBell,
  };
};
