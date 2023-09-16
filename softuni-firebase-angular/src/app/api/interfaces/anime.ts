export interface FormattedAnime {
  mal_id: number
  title: string | 'N/A';
  episodes: number | 'N/A';
  aired: string | 'N/A';
  synopsis: string | 'N/A';
  score: number | 'N/A';
  members: number | 'N/A';
  studios: string | 'N/A';
  source: string | 'N/A';
  genres: string | 'N/A';
  image: string | 'N/A';
}

export interface AnimeList {
  pagination: Pagination;
  data: AnimeData[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeData {
  mal_id: number;
  url: string;
  images: ImageData | null;
  trailer: TrailerData;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AiredData | null;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: BroadcastData;
  producers: Producer[] | null;
  licensors: Licensors[] | null;
  studios: Studios[] | null;
  genres: Genre[] | string;
  explicit_genres: any[];
  themes: Theme[];
  demographics: any[];
}

interface ImageData {
  jpg: ImageFormat;
  webp: ImageFormat;
}

interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface TrailerData {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImageFormat;
}

interface Title {
  type: string;
  title: string;
}

interface AiredData {
  from: string;
  to: string;
  prop: {
    from: DateProp;
    to: DateProp;
  };
  string: string;
}

interface DateProp {
  day: number;
  month: number;
  year: number;
}

interface BroadcastData {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface CommonBase {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Licensors extends CommonBase {}
interface Studios extends CommonBase {}
export interface Genre extends CommonBase {}
interface Theme extends CommonBase {}
interface Producer extends CommonBase {}
