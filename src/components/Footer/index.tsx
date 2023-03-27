import { BsGithub } from 'react-icons/bs';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0">
      <div>
        <a
          href="https://github.com/Mathh19/focus-mate"
          target="_blank"
          rel="noopener noreferrer"
          className="m-4 flex items-center gap-2 rounded-md p-2 text-xl font-bold tracking-wide text-textColor transition duration-300 ease-in-out hover:bg-textColor hover:text-backgroundColor"
        >
          <BsGithub className="h-7 w-7" />
          github
        </a>
      </div>
    </footer>
  );
};
