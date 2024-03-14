import { useState, useContext, useEffect } from 'react';
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
import { PomodoroProps } from '../../shared-types/pomodoro';
import { SettingsBox } from './components/SettingsBox';
import { SettingsInputTimer } from './components/SettingsInputTimer';
import { openWindow } from './utils/openWindow';
import { displayInMinutes } from './utils/displayInMinutes';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';

export const Settings = () => {
  const { pomodoro, setSettingPomodoro } = useContext(PomodoroContext);
  const [open, setOpen] = useState(false);
  const [newPomodoroSettings, setNewPomodoroSettings] =
    useState<PomodoroProps>(pomodoro);
  const [volume, setVolume] = useState<number[]>([pomodoro.volume[0]]);
  const [theme, setTheme] = useState(pomodoro.theme);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettingPomodoro({
      ...newPomodoroSettings,
      volume: volume,
      theme: theme,
    });

    setOpen(false);
  };

  const handleInputTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPomodoroSettings((prevPomodoro) => ({
      ...prevPomodoro,
      [name]:
        name === 'cycles' ? parseInt(value) : minutesToSeconds(parseInt(value)),
    }));
  };

  const handleToggleNotification = () => {
    Notification.requestPermission()
      .then((permission) =>
        permission !== 'granted'
          ? setNewPomodoroSettings({
              ...newPomodoroSettings,
              notification: false,
            })
          : setNewPomodoroSettings({
              ...newPomodoroSettings,
              notification: false,
            }),
      )
      .catch((err) =>
        console.log(`Failed to request notification permission: ${err}`),
      )
      .finally(() =>
        setNewPomodoroSettings({
          ...newPomodoroSettings,
          notification: !newPomodoroSettings.notification,
        }),
      );
  };

  useEffect(() => {
    setNewPomodoroSettings(pomodoro);
    setVolume(pomodoro.volume);
    setTheme(pomodoro.theme);
  }, [pomodoro]);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        aria-label="Open settings"
        icon={
          <IoSettingsSharp
            size={26}
            className="transition duration-300 ease-in-out group-hover:-rotate-90"
          />
        }
        className="group rounded-full bg-transparent p-1.5"
      />
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="mb-2 text-2xl font-bold uppercase">Settings</h2>
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={handleSubmit} className="divide-bluishGray divide-y">
            <SettingsBox title="Timer" icon={<RiTimerLine />}>
              <div>
                <span className="font-semibold">time in minutes</span>
                <div className="my-1 flex flex-wrap gap-6 max-[418px]:justify-between">
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Pomodoro:"
                    name="pomodoroTime"
                    type="number"
                    defaultValue={displayInMinutes(
                      newPomodoroSettings.pomodoroTime,
                    )}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Short Break:"
                    name="shortRestTime"
                    type="number"
                    defaultValue={displayInMinutes(
                      newPomodoroSettings.shortRestTime,
                    )}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Long Break:"
                    name="longRestTime"
                    type="number"
                    defaultValue={displayInMinutes(
                      newPomodoroSettings.longRestTime,
                    )}
                  />
                  <SettingsInputTimer
                    onChange={handleInputTimerChange}
                    labelText="Cycles:"
                    name="cycles"
                    type="number"
                    defaultValue={newPomodoroSettings.cycles}
                  />
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <ToggleButton
                      label="Auto Pomodoro"
                      toggled={newPomodoroSettings.auto}
                      setToggle={() =>
                        setNewPomodoroSettings({
                          ...newPomodoroSettings,
                          auto: !newPomodoroSettings.auto,
                        })
                      }
                    />
                  </div>
                  {!isMobile && (
                    <div>
                      <ToggleButton
                        label="Notification"
                        toggled={newPomodoroSettings.notification}
                        setToggle={handleToggleNotification}
                      />
                    </div>
                  )}
                  {isMobile && (
                    <div>
                      <ToggleButton
                        label="Vibrate"
                        toggled={newPomodoroSettings.vibrate}
                        setToggle={() =>
                          setNewPomodoroSettings({
                            ...newPomodoroSettings,
                            vibrate: !newPomodoroSettings.vibrate,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </SettingsBox>
            <SettingsBox title="Tasks" icon={<BsListCheck />}>
              <ToggleButton
                label="routine mode"
                toggled={newPomodoroSettings.routineMode}
                setToggle={() =>
                  setNewPomodoroSettings({
                    ...newPomodoroSettings,
                    routineMode: !newPomodoroSettings.routineMode,
                  })
                }
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
              <Button
                type="button"
                onClick={() => setOpen(false)}
                text="cancel"
                className="bg-transparent hover:bg-transparent active:bg-transparent"
              />
              <Button type="submit" text="apply" />
            </div>
          </form>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
