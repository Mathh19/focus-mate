import { useRef, useState, useEffect } from 'react';
import { TaskItem } from '../TaskItem';
import { ContainerTaskItemProps } from './types';

export const ContainerTaskItem = ({
  tasks,
  shadowEffectColor,
  dynamicHeight,
}: ContainerTaskItemProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);

  const handleScroll = () => {
    const ulElement = ulRef.current;
    if (ulElement) {
      setIsScrolledToTop(ulElement.scrollTop === 0);
    }
  };

  useEffect(() => {
    const ulElement = ulRef.current;
    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);
      setHasScroll(ulElement.clientHeight >= 289);
      return () => ulElement.removeEventListener('scroll', handleScroll);
    }
  }, [tasks]);

  return (
    <div>
      {tasks.length === 0 ? (
        <span
          className={`flex items-center justify-center px-2 text-2xl font-semibold text-white/40 ${
            !dynamicHeight && 'min-h-[288px]'
          }`}
        >
          No Tasks...
        </span>
      ) : (
        <ul
          ref={ulRef}
          className={`relative mb-4 max-h-[289px] ${
            !dynamicHeight && 'min-h-[288px]'
          } space-y-3 overflow-y-auto overflow-x-hidden px-2 ${
            hasScroll &&
            isScrolledToTop &&
            `after:pointer-events-none after:absolute after:bottom-0 after:h-4 after:w-full after:animate-fade-in-slowly after:bg-gradient-to-t ${
              shadowEffectColor === 'backgroundColor'
                ? 'after:from-backgroundColor'
                : 'after:from-darkGray'
            } after:to-transparent after:content-[''] ${
              shadowEffectColor === 'backgroundColor'
                ? 'after:dark:from-darkBackgroundColor'
                : 'after:dark:from-darkTheme-950'
            }`
          }`}
        >
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};
