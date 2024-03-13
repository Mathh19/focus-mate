import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import * as Slider from '@radix-ui/react-slider';
import {
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';
import { VolumeSliderProps } from './types';
import { useSound } from '../../../hooks/useSound';

export const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  const { testBell } = useSound();
  const volumeInMemo = useMemo(() => {
    if (volume[0] === 0) {
      return 'mute';
    }
    return `${volume[0]}%`;
  }, [volume]);

  const handlePlayTestAudio = () => {
    testBell.volume = volume[0] / 100;
    testBell.play();
  };

  return (
    <div className="flex items-center">
      {volume[0] === 0 ? (
        <BsFillVolumeMuteFill
          className="h-7 w-7 text-skin-volume-input-mute"
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
        <Slider.Track className="relative h-[3px] grow cursor-pointer rounded-full bg-skin-volume-slider">
          <Slider.Range className="absolute h-full rounded-full bg-skin-volume-slider" />
        </Slider.Track>
        <Slider.Thumb
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`${volume[0] === 0 ? 'mute' : `${volume}%`}`}
          className="block h-5 w-5 cursor-pointer rounded-[10px] bg-skin-volume-slider transition-all hover:shadow-shadowAllSides hover:shadow-skin-base"
        />
        <Tooltip
          id="my-tooltip"
          data-tooltip-content={volumeInMemo}
          aria-label="Volume"
          className="absolute top-0 rounded-sm bg-skin-input-primary px-1 font-semibold"
        />
      </Slider.Root>
      <BsFillVolumeUpFill className="h-7 w-7" aria-label="Volume up" />
    </div>
  );
};
