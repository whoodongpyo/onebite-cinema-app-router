import MoviePage from '@/app/movie/[id]/page';

export default function Page(props: any) {
  return (
    <div>
      인터셉트 성공!
      <MoviePage {...props} />
    </div>
  );
}
