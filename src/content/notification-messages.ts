const workMessages = [
  "Get in the zone! It's time to focus and conquer.",
  'Ready, set, go! Focus your energy on the task at hand.',
  'Embrace the challenge. Stay focused and give it your all.',
  "Lock in your concentration. You've got this!",
  'Time to dive deep. Focus and let the productivity flow.',
  'Channel your inner determination. Stay focused and make progress.',
  "Eliminate distractions. It's time for focused work.",
  'Keep your eye on the prize. Stay focused and achieve greatness.',
  'Tap into your productivity superpowers. Focus and make it happen.',
  "Engage your laser focus. You're unstoppable!",
];

const shortBreakMessages = [
  "Time's up! Take a break and recharge.",
  "Ding-dong! It's break time. Give yourself a pat on the back.",
  "Congrats, you've completed a pomodoro! It's time to rest and rejuvenate.",
  'Break time! Stretch your legs and relax.',
  'Well done! Take a breather and come back stronger.',
  'You did it! Time to take a break and let your brain recharge.',
  "Pause and relax. It's break time!",
  'Fantastic work! Treat yourself to a well-deserved break.',
  "Ding! It's time to recharge and refocus.",
  'Pomodoro complete! Enjoy a short break and get ready for the next one.',
];

const longBreakMessages = [
  "Time's up! Take a long break and recharge.",
  "Ding-dong! It's long break time. Give yourself a pat on the back.",
  "Congrats, you've completed several pomodoros! Enjoy a long rest and rejuvenate.",
  'Long break time! Take a deep breath and relax for a while.',
  'Well done! Take a breather and come back stronger after a long break.',
  'You did it! Time to take a long break and let your brain recharge.',
  "Pause and relax. It's long break time!",
  'Fantastic work! Treat yourself to a well-deserved long break.',
  "Ding! It's time to recharge and refocus with a long break.",
  'Multiple pomodoros complete! Enjoy a long break and get ready for the next session.',
];

const getRandomNotificationMessage = (messages: string[]) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export const workMessage = getRandomNotificationMessage(workMessages);

export const randomShortBreakMessage =
  getRandomNotificationMessage(shortBreakMessages);

export const randomLongBreakMessage =
  getRandomNotificationMessage(longBreakMessages);
