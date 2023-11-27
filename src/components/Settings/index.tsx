import { useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { RiTimerLine } from 'react-icons/ri';
import { BsSoundwave, BsListCheck } from 'react-icons/bs';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { IoSettingsSharp } from 'react-icons/io5';
import { GiPaintRoller } from 'react-icons/gi';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { VolumeSlider } from '../UI/VolumeSlider';
import { ToggleButton } from '../UI/ToggleButton';
import { minutesToSeconds } from '../../utils/minutesToSeconds';
import { SelectTheme } from '../SelectTheme';
import { ThemeProps, TimerProps } from '../../shared-types/pomodoro';
import { SettingsBox } from './components/SettingsBox';
import { SettingsInputTimer } from './components/SettingsInputTimer';
import { openWindow } from './utils/openWindow';
import { displayInMinutes } from './utils/displayInMinutes';
import { Modal } from '../UI/Modal';

export const Settings = () => {
  const { timer, setTimer, configPomodoro, setConfig } =
    useContext(PomodoroContext);
  const [open, setOpen] = useState(false);
  const [newTimer, setNewTimer] = useState<TimerProps>({
    ...timer,
  });
  const [volume, setVolume] = useState<number[]>([configPomodoro.volume[0]]);
  const [autoPomodoro, setAutoPomodoro] = useState(configPomodoro.auto);
  const [theme, setTheme] = useState<ThemeProps>(configPomodoro.theme);
  const [notification, setNotification] = useState(configPomodoro.notification);
  const [routineMode, setRoutineMode] = useState(configPomodoro.routineMode);
  const [vibrate, setVibrate] = useState(configPomodoro.vibrate);

  const handleOpenOrCloseModal = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setOpen(false);
      document.body.style.overflow = 'unset';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimer(newTimer);
    setConfig({
      auto: autoPomodoro,
      volume: volume,
      theme: theme,
      notification: notification,
      routineMode: routineMode,
      vibrate: vibrate,
    });
    document.body.style.overflow = 'unset';
    setOpen(false);
  };

  const handleInputTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimer((prevTimer) => ({
      ...prevTimer,
      [name]:
        name === 'cycles' ? parseInt(value) : minutesToSeconds(parseInt(value)),
    }));
  };

  const handleToggleNotification = () => {
    Notification.requestPermission()
      .then((permission) =>
        permission !== 'granted'
          ? setNotification(false)
          : setNotification(true),
      )
      .catch((err) =>
        console.log(`Failed to request notification permission: ${err}`),
      )
      .finally(() => setNotification(!notification));
  };

  return (
    <div>
      <button
        onClick={() => handleOpenOrCloseModal(true)}
        className="gap-2 px-2 py-1"
        aria-label="Settings"
        title="Settings"
      >
        <IoSettingsSharp className="fill-purplishGray text-4xl transition duration-300 ease-in-out hover:-rotate-90 blueTheme:fill-blueTheme-grey dark:fill-white max-[320px]:text-2xl" />
      </button>
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="mb-2 text-2xl font-bold uppercase">Settings</h2>
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={handleSubmit} className="divide-y divide-bluishGray">
            <SettingsBox title="Timer" icon={<RiTimerLine />}>
              <div>
                <span className="font-semibold">time in minutes</span>
                <div className="my-1 flex flex-wrap gap-6 max-[418px]:justify-between">
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Pomodoro:"
                    name="pomodoroTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.pomodoroTime)}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Short Break:"
                    name="shortRestTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.shortRestTime)}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Long Break:"
                    name="longRestTime"
                    type="number"
                    defaultValue={displayInMinutes(timer.longRestTime)}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Cycles:"
                    name="cycles"
                    type="number"
                    defaultValue={timer.cycles}
                  />
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <ToggleButton
                      label="Auto Pomodoro"
                      toggled={autoPomodoro}
                      setToggle={() => setAutoPomodoro(!autoPomodoro)}
                    />
                  </div>
                  {!isMobile && (
                    <div>
                      <ToggleButton
                        label="Notification"
                        toggled={notification}
                        setToggle={handleToggleNotification}
                      />
                    </div>
                  )}
                  {isMobile && (
                    <div>
                      <ToggleButton
                        label="Vibrate"
                        toggled={vibrate}
                        setToggle={() => setVibrate(!vibrate)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </SettingsBox>
            <SettingsBox title="Tasks" icon={<BsListCheck />}>
              <ToggleButton
                label="routine mode"
                toggled={routineMode}
                setToggle={() => setRoutineMode(!routineMode)}
              />
            </SettingsBox>
            <SettingsBox
              title="Sound"
              icon={<BsSoundwave className="h-7 w-7" />}
            >
              <span className="mt-2 font-semibold">Volume:</span>
              <VolumeSlider volume={volume} setVolume={setVolume} />
            </SettingsBox>
            {!isMobile && (
              <SettingsBox title="Screen">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openWindow(400, 800);
                  }}
                  className="flex items-center gap-2 font-semibold"
                >
                  Open in floating window
                  <RxOpenInNewWindow />
                </button>
              </SettingsBox>
            )}
            <SettingsBox
              title="Theme"
              icon={<GiPaintRoller className="h-6 w-6 rotate-45" />}
            >
              <div>
                <SelectTheme themeSelected={theme} setTheme={setTheme} />
              </div>
            </SettingsBox>
            <div className="flex justify-between pt-4 text-xl font-semibold">
              <button
                type="button"
                onClick={() => handleOpenOrCloseModal(false)}
              >
                cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-tealBlue px-2 py-1.5 text-center  drop-shadow-3xl dark:bg-white dark:text-darkTheme-background"
              >
                apply
              </button>
            </div>
          </form>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
