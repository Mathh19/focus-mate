import { useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { RiTimerLine } from 'react-icons/ri';
import { BsSoundwave, BsListCheck } from 'react-icons/bs';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { IoSettingsSharp } from 'react-icons/io5';
import { GiPaintRoller } from 'react-icons/gi';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { SettingsInputTimer } from '../UI/SettingsInputTimer';
import { SettingsBox } from '../SettingsBox';
import { VolumeSlider } from '../UI/VolumeSlider';
import { ToggleButton } from '../UI/ToggleButton';
import { openWindow } from '../../utils/openWindow';
import { minutesToSeconds } from '../../utils/minutesToSeconds';
import { SelectTheme } from '../SelectTheme';
import { ThemeProps, TimerProps } from '../../shared-types/pomodoro';

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
  const [vibrate, setVibrate] = useState(false);

  const displayInMinutes = (num: number) => {
    const min = num / 60;
    return `${min}`;
  };

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

  const openPomodoroWindow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openWindow(400, 800);
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
      {open && (
        <div
          onClick={() => handleOpenOrCloseModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-backgroundColor/60 px-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="my-6 max-h-[95%] space-y-5 overflow-auto rounded-lg bg-darkBlue p-4 dark:bg-darkTheme-dark-grey"
          >
            <div className="relative">
              <h2 className="mb-2 text-2xl font-bold uppercase">Settings</h2>
              <div className="divide-y divide-bluishGray pb-16">
                <SettingsBox title="Timer" icon={<RiTimerLine />}>
                  <div>
                    <span className="font-semibold">time in minutes</span>
                    <div className="my-1 flex flex-wrap gap-8 max-[415px]:justify-between">
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
                          setToggle={setAutoPomodoro}
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
                            setToggle={setVibrate}
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
                    setToggle={setRoutineMode}
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
                      onClick={(e) => openPomodoroWindow(e)}
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
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xl font-semibold">
                <button
                  type="button"
                  onClick={() => handleOpenOrCloseModal(false)}
                  className="rounded-md bg-tealBlue p-2 text-bluishPurple drop-shadow-3xl blueTheme:text-blueTheme dark:bg-white dark:text-darkTheme-background"
                >
                  cancel
                </button>
                <button type="submit">apply</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
