export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between border-b border-bluishGray p-4">
      {children}
    </header>
  );
};
