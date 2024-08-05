export interface VideosResponse {
  id:      number;
  results: Video[];
}

export interface Video {
  iso_639_1:    ISO639_1;
  iso_3166_1:   ISO3166_1;
  name:         string;
  key:          string;
  site:         Site;
  size:         number;
  type:         Type;
  official:     boolean;
  published_at: Date;
  id:           string;
}

export enum ISO3166_1 {
  Us = "US",
}

export enum ISO639_1 {
  En = "en",
}

export enum Site {
  YouTube = "YouTube",
}

export enum Type {
  BehindTheScenes = "Behind the Scenes",
  Bloopers = "Bloopers",
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}
