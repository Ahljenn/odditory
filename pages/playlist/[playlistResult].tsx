import React from 'react';
import { useRouter } from 'next/router';

const playlistResult: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { playlist } = router.query;

  return <div>test</div>;
};

export default playlistResult;
