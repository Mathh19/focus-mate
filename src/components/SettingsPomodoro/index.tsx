import { useState, useContext } from 'react';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { minutesToSeconds } from '../../utils/minutesToSeconds';
import { isMobile } from 'react-device-detect';
import { SettingsPomodoroInput } from '../SettingsPomodoroInput';
import { SettingsPomodoroBox } from '../SettingsPomodoroBox';
import { VolumeSlider } from '../VolumeSlider';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiTimerLine } from 'react-icons/ri';
import { BsSoundwave } from 'react-icons/bs';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { ToggleButton } from '../ToggleButton';
import { openWindow } from '../../utils/openWindow';

export const SettingsPomodoro = () => {
  const { timer, setTimer, configPomodoro, setConfig } =
    useContext(PomodoroContext);
  const [open, setOpen] = useState(false);
  const [newTimer, setNewTimer] = useState({
    ...timer,
  });
  const [volume, setVolume] = useState<number[]>([configPomodoro.volume[0]]);
  const [autoPomodoro, setAutoPomodoro] = useState(configPomodoro.auto);

  const displayInMinutes = (num: number) => {
    const min = num / 60;
    return `${min}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimer(newTimer);
    setOpen(false);
    setConfig({ configPomodoro: { auto: autoPomodoro, volume: volume } });
  };

  const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimer((prevTimer) => ({
      ...prevTimer,
      [name]: minutesToSeconds(parseInt(value)),
    }));
  };

  const handleCyclesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimer((prevTimer) => ({
      ...prevTimer,
      [name]: parseInt(value),
    }));
  };

  const openPomodoroWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openWindow(400, 700, 'Pomodoro');
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="gap-2 px-2 py-1"
        aria-label="Settings"
        title="Settings"
      >
        <IoSettingsSharp className="fill-purplishGray text-4xl transition duration-300 ease-in-out hover:-rotate-90 max-[320px]:text-2xl" />
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex min-h-screen justify-center bg-backgroundColor/60 px-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="relative my-6 max-w-lg space-y-5 rounded-lg bg-darkBlue p-4"
          >
            <h2 className="mb-2 text-2xl font-bold uppercase">Settings</h2>
            <SettingsPomodoroBox title="Timer" icon={<RiTimerLine />}>
              <div>
                <span className="font-semibold">time in minutes</span>
                <div className="my-1 flex flex-wrap gap-8 max-[415px]:justify-between">
                  <SettingsPomodoroInput
                    onChange={handleTimerInputChange}
                    labelText="Pomodoro:"
                    name="pomodoroTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.pomodoroTime)}
                  />
                  <SettingsPomodoroInput
                    onChange={handleTimerInputChange}
                    labelText="Short Break:"
                    name="shortRestTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.shortRestTime)}
                  />
                  <SettingsPomodoroInput
                    onChange={handleTimerInputChange}
                    labelText="Long Break:"
                    name="longRestTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.longRestTime)}
                  />
                  <SettingsPomodoroInput
                    onChange={handleCyclesInputChange}
                    labelText="Cycles:"
                    name="cycles"
                    type="number"
                    defaultValue={timer.cycles}
                  />
                </div>
                <div className="mt-3">
                  <ToggleButton
                    label="Auto Pomodoro"
                    toggled={autoPomodoro}
                    setToggle={setAutoPomodoro}
                  />
                </div>
              </div>
            </SettingsPomodoroBox>
            <SettingsPomodoroBox
              title="Sound"
              icon={<BsSoundwave className="h-7 w-7" />}
            >
              <span className="mt-2 font-semibold">Volume:</span>
              <VolumeSlider volume={volume} setVolume={setVolume} />
            </SettingsPomodoroBox>
            {!isMobile && (
              <SettingsPomodoroBox title="Screen">
                <button
                  onClick={(e) => openPomodoroWindow(e)}
                  className="flex items-center gap-2 font-semibold"
                >
                  Open in floating window
                  <RxOpenInNewWindow />
                </button>
              </SettingsPomodoroBox>
            )}
            <div className="absolute bottom-0 left-0 flex w-full justify-between p-4 text-xl font-semibold">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-tealBlue p-2 text-bluishPurple"
              >
                cancel
              </button>
              <button type="submit">apply</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
