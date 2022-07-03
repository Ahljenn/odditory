import React from 'react';

interface Props {}

const Main: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <section className="flex items-end space-x-7 bg-gradient-to-b to-[#181b20] from-[#282b30] h-80 padding-8 w-full"></section>
  );
};

export default Main;
