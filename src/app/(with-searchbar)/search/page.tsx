import styles from './page.module.css';

import { Suspense } from 'react';
import { Metadata } from 'next';

import MovieItem from '@/components/movie-item';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';

import { MovieData } from '@/types';

async function SearchResult({ q }: { q: string }) {
  // 현재는 영화 데이터가 변경될 일이 없으므로, force-cache 를 적용한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    return <div>검색 중 문제가 발생했습니다...</div>;
  }

  const searchedMovies: MovieData[] = await response.json();

  return searchedMovies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

type Props = {
  searchParams: { q?: string };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `검색 결과 : ${searchParams.q} | 한입 씨네마`,
    description: `${searchParams.q}의 검색 결과입니다.`,
    openGraph: {
      title: `검색 결과 : ${searchParams.q} | 한입 씨네마`,
      description: `${searchParams.q}의 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}
export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className={styles.search_container}>
      <Suspense
        key={searchParams.q || ''}
        fallback={<MovieListSkeleton count={12} />}
      >
        <SearchResult q={searchParams.q || ''} />
      </Suspense>
    </div>
  );
}
