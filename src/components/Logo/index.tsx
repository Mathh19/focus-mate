export const Logo = () => {
  return (
    <div
      onClick={() => location.reload()}
      aria-label="The logo site"
      className="flex cursor-pointer items-center gap-2"
    >
      <img
        className="h-16 w-16"
        src="/logo-site.svg"
        alt="An image of the website's logo"
      />
      <span className=" font-sans text-2xl font-bold">Focus Mate</span>
    </div>
  );
};
