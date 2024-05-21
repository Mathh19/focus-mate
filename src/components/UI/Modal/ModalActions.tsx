export const ModalActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="flex w-full justify-between rounded-b-lg p-4">
      {children}
    </footer>
  );
};
