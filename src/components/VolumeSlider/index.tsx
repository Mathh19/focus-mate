import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import * as Slider from '@radix-ui/react-slider';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';

export const VolumeSlider = () => {
  const [value, setValue] = useState<number[]>([100]);

  return (
    <div className="flex items-center ">
      <BsFillVolumeMuteFill className="h-7 w-7" />
      <Slider.Root
        className="relative mx-2 flex h-5 w-[200px] touch-none select-none items-center"
        defaultValue={value}
        max={100}
        step={1}
        onValueChange={setValue}
      >
        <Slider.Track className="relative h-[3px] grow cursor-pointer rounded-full bg-bluishPurple/25">
          <Slider.Range className="absolute h-full rounded-full bg-bluishPurple" />
        </Slider.Track>
        <Slider.Thumb
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`${value}`}
          className="block h-5 w-5 cursor-pointer rounded-[10px] bg-bluishPurple transition-all hover:shadow-[0_2px_10px] hover:shadow-bluishPurple"
        />
        <Tooltip
          id="my-tooltip"
          className="absolute top-0 rounded-sm bg-bluishGray px-1 font-semibold"
        />
      </Slider.Root>
      <BsFillVolumeUpFill className="h-7 w-7" />
    </div>
  );
};
