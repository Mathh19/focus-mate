import { BsGithub } from 'react-icons/bs';

export const Footer = () => {
  return (
    <footer className="flex w-full">
      <div>
        <a
          href="https://github.com/Mathh19/focus-mate"
          target="_blank"
          rel="noopener noreferrer"
          className="m-4 flex items-center gap-2 rounded-md p-2 text-xl font-bold tracking-wide text-white transition duration-300 ease-in-out hover:bg-white hover:text-backgroundColor"
        >
          <BsGithub className="h-7 w-7" />
          github
        </a>
      </div>
    </footer>
  );
};
