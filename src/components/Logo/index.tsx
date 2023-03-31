export const Logo = () => {
  return (
    <div
      onClick={() => location.reload()}
      className="flex cursor-pointer items-center gap-2"
    >
      <img className="w-16" src="/assets/logo-site.svg" alt="The logo site" />
      <p className="font-sans text-xl font-bold">Focus mate</p>
    </div>
  );
};
