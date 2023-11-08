type ModalActionProps = {
  children: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ModalAction = ({
  children,
  className,
  danger = false,
  onClick,
  ...rest
}: ModalActionProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`${className} rounded-md ${
        danger ? 'bg-dangerColor' : 'bg-tealBlue'
      } px-2 py-1.5 text-xl font-semibold text-white drop-shadow-3xl ${
        !danger &&
        'hover:text-bluishPurple blueTheme:hover:text-blueTheme dark:bg-darkTheme-grey dark:hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};
