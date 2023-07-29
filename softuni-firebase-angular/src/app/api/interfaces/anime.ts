/* exporting AnimeData and AnimeList as data types for anime from
   the jikan api (single anime and list) segragated into smaller interfaces below */

export interface AnimeList {
  pagination: Pagination;
  data: AnimeData[];
}

interface Pagination {
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
  images: ImageData;
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
  aired: AiredData;
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
  producers: Producer[];
  licensors: Licensors[];
  studios: Studios[];
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
