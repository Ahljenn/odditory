import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

/**
 * This component is used to display a spinning loading indicator.
 */
const Loading = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the loading indicator.
   */
  return (
    <div className="flex flex-col items-center w-full">
      <RefreshIcon className="h-[15rem] mb-1 animate-spin" />
      <h1 className="text-xl mb-5">Loading...</h1>
    </div>
  );
};

export default Loading;
