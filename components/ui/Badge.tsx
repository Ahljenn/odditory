import React from 'react';

interface BadgeItem {
  Icon: any;
  title: string;
  update?: () => void;
}

const Badge: React.FC<BadgeItem> = ({ Icon, title, update }: BadgeItem): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer group mt-6 w-12 sm:w-20 hover:text-white"
      onClick={update}
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 text-xl whitespace-nowrap group-hover:opacity-100 tracking widest">
        {title}
      </p>
    </div>
  );
};

export default Badge;
