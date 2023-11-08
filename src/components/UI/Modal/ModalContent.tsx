export const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center p-4">
      {children}
    </div>
  );
};
