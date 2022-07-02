import React from 'react';

interface BadgeItem {
  Icon: any;
  title: string;
}

const Badge: React.FC<BadgeItem> = ({ Icon, title }: BadgeItem): JSX.Element => {
  return (
    <div className="flex flex-col items-center cursor-pointer group mt-6 w-12 sm:w-20 hover:text-white">
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking widest">{title}</p>
    </div>
  );
};

export default Badge;
