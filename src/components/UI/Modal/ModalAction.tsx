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
        danger ? 'bg-red-600' : 'bg-skin-base'
      } px-2 py-1.5 text-xl font-semibold text-skin-primary-text drop-shadow-3xl ${
        !danger && 'hover:text-skin-primary-text'
      }`}
    >
      {children}
    </button>
  );
};
