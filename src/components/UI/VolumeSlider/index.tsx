import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import * as Slider from '@radix-ui/react-slider';
import {
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';
import { VolumeSliderProps } from './types';
import testSound from '../../../sounds/test-sound.mp3';
const playTestSound = new Audio(testSound);

export const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  const volumeInMemo = useMemo(() => {
    if (volume[0] === 0) {
      return 'mute';
    }
    return `${volume[0]}%`;
  }, [volume]);

  const handlePlayTestAudio = () => {
    playTestSound.volume = volume[0] / 100;
    playTestSound.play();
  };

  return (
    <div className="flex items-center">
      {volume[0] === 0 ? (
        <BsFillVolumeMuteFill
          className="h-7 w-7 text-bluishPurple blueTheme:text-blueTheme dark:text-darkTheme"
          aria-label="Volume mute"
        />
      ) : (
        <BsFillVolumeDownFill className="h-7 w-7" aria-label="Volume down" />
      )}
      <Slider.Root
        className="relative mx-2 flex h-5 w-[200px] touch-none select-none items-center"
        defaultValue={volume}
        onClick={handlePlayTestAudio}
        max={100}
        step={1}
        onValueChange={setVolume}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volume[0]}
        aria-valuetext={volumeInMemo}
      >
        <Slider.Track className="relative h-[3px] grow cursor-pointer rounded-full bg-bluishPurple/25 blueTheme:bg-blueTheme/25 dark:bg-darkTheme/25">
          <Slider.Range className="absolute h-full rounded-full bg-bluishPurple blueTheme:bg-blueTheme dark:bg-white" />
        </Slider.Track>
        <Slider.Thumb
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`${volume[0] === 0 ? 'mute' : `${volume}%`}`}
          className="block h-5 w-5 cursor-pointer rounded-[10px] bg-bluishPurple transition-all hover:shadow-shadowAllSides hover:shadow-bluishPurple blueTheme:bg-blueTheme blueTheme:hover:shadow-blueTheme dark:bg-white dark:hover:shadow-white"
        />
        <Tooltip
          id="my-tooltip"
          data-tooltip-content={volumeInMemo}
          aria-label="Volume"
          className="absolute top-0 rounded-sm bg-bluishGray px-1 font-semibold"
        />
      </Slider.Root>
      <BsFillVolumeUpFill className="h-7 w-7" aria-label="Volume up" />
    </div>
  );
};
