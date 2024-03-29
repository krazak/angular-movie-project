export class MovieResponse {
  count: number;
  results: Movie[];
}

export class Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

