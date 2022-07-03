import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

const Loading: React.FC<void> = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-full">
      <RefreshIcon className="h-[15rem] mb-1 animate-spin" />
      <h1 className="text-xl">Loading...</h1>
    </div>
  );
};

export default Loading;
