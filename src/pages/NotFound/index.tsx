import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHomePage = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-3 px-4 text-center">
        <img
          className="h-full w-full max-w-xs"
          src="./not-found-clock.svg"
          alt="image not found page"
        />
        <p className="text-6xl font-semibold max-[550px]:text-4xl">
          Not Found.
        </p>
      </div>
      <footer className="fixed bottom-0 w-full p-4">
        <button
          onClick={handleBackHomePage}
          className="group flex items-center gap-1 rounded-md bg-white px-2 py-1.5 text-2xl font-bold text-darkBackgroundColor"
        >
          <FaArrowLeft
            size={20}
            className="duration-150 ease-in-out group-hover:-translate-x-1"
          />
          Go back
        </button>
      </footer>
    </div>
  );
};
