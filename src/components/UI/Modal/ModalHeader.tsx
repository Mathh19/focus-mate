export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between rounded-t-lg border-b border-gray-500 bg-skin-modal-background p-4 text-2xl font-semibold">
      {children}
    </header>
  );
};
