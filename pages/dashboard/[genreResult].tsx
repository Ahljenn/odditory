import React from 'react';
import { useRouter } from 'next/router';

const genreResult: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { genre } = router.query;

  return <div>Genre: {genre}</div>;
};

export default genreResult;
