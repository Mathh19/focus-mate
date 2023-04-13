import { useState } from 'react';

export const AnimatedCheck = () => {
  const [check, setCheck] = useState(false);
  return (
    <div
      onClick={() => setCheck(!check)}
      className={`relative h-6 w-6 cursor-pointer rounded-full border-[2px] ${
        !check ? 'border-textColor' : 'border-successColor'
      }`}
    >
      {check && (
        <>
          <span className="check bottom-[6px] right-[9px] w-[10px] rotate-45 animate-check-short-line"></span>
          <span className="check bottom-[10px] left-[5px] w-[22px] -rotate-45 animate-check-long-line"></span>
        </>
      )}
    </div>
  );
};
