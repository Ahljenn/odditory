import React from 'react';

interface Optional {
  type?: string;
}

/**
 * This component renders the intro container.
 * This is located ontop of the dashboard and guest page, varying depending on the session type
 **/
const IntroContainer: React.FC<Optional> = ({ type }: Optional): JSX.Element => {
  /**
   * @returns JSX.Element - renders the intro container.
   * @param type - the type of session
   **/
  return (
    <div className="bg-gradient-to-b to-[#181b20] from-[#282b30] padding-8 w-full pb-10">
      <h1 className="text-center text-[40px] sm:text-[45px] 2xl:text-[60px] font-bold">
        The Place to Discover More
      </h1>
      <div className="flex justify-center">
        <p className="text-center w-5/6 sm:w-[40rem] text-gray-400">
          The central location to analyze the music you love. We use Spotify activity to tailor an
          experience suited for you.{' '}
          {type === 'Guest'
            ? 'Some features may be disabled since you are logged in as a guest.'
            : ''}
        </p>
      </div>
    </div>
  );
};

export default IntroContainer;
