export const Logo = () => {
  return (
    <div
      onClick={() => location.reload()}
      className="flex cursor-pointer items-center gap-2"
    >
      <img
        className="h-[86px] w-[86px]"
        src="/logo-site.svg"
        alt="The logo site"
      />
      <p className="font-sans text-2xl font-bold">Focus Mate</p>
    </div>
  );
};
