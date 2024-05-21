export const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center bg-skin-modal-background p-4 text-xl font-semibold">
      {children}
    </div>
  );
};
