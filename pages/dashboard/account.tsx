import React from 'react';
import SubpageHeader from '../../components/SubpageHeader';

interface Props {}

const Account: React.FC<Props> = ({}: Props): JSX.Element => {
  return (
    <>
      <SubpageHeader pagename="ACCOUNT" />
    </>
  );
};

export default Account;
