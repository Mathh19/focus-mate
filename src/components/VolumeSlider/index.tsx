import { useMemo } from 'react';
import { VolumeSliderProps } from './types';
import { Tooltip } from 'react-tooltip';
import * as Slider from '@radix-ui/react-slider';
import {
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
} from 'react-icons/bs';

export const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  const volumeInMemo = useMemo(() => {
    if (volume[0] === 0) {
      return 'mute';
    }
    return `${volume[0]}%`;
  }, [volume]);

  return (
    <div className="flex items-center">
      {volume[0] === 0 ? (
        <BsFillVolumeMuteFill
          className="h-7 w-7 text-bluishPurple"
          aria-label="Volume mute"
        />
      ) : (
        <BsFillVolumeDownFill className="h-7 w-7" aria-label="Volume down" />
      )}
      <Slider.Root
        className="relative mx-2 flex h-5 w-[200px] touch-none select-none items-center"
        defaultValue={volume}
        max={100}
        step={1}
        onValueChange={setVolume}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volume[0]}
        aria-valuetext={volumeInMemo}
      >
        <Slider.Track className="relative h-[3px] grow cursor-pointer rounded-full bg-bluishPurple/25">
          <Slider.Range className="absolute h-full rounded-full bg-bluishPurple" />
        </Slider.Track>
        <Slider.Thumb
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`${volume[0] === 0 ? 'mute' : `${volume}%`}`}
          className="block h-5 w-5 cursor-pointer rounded-[10px] bg-bluishPurple transition-all hover:shadow-[0_2px_10px] hover:shadow-bluishPurple"
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
