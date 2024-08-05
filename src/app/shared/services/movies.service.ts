import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { environment } from "../../../environments/environment.development";
import { Movie, MovieResponse } from "../models/movie.interface";
import { Video, VideosResponse } from "../models/video.interface";
import { Cast, CreditsResponse } from "../models/credit.interface";

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly apiMovieUrl = environment.apiMovieUrl;
  private readonly apiKey = environment.apiKEY;
  private readonly language = environment.language;

  private readonly http = inject(HttpClient);

  getNowPlayingMovies():Observable<Movie[]>{
    return this.http.get<MovieResponse>(`${this.apiMovieUrl}/movie/now_playing?api_key=${this.apiKey}&language=${this.language}`)
    .pipe(
      map((result:MovieResponse)=> result.results as Movie[])
    )
  }

  getUpcomingMovies():Observable<Movie[]>{
    return this.http.get<MovieResponse>(`${this.apiMovieUrl}/movie/upcoming?api_key=${this.apiKey}&language=${this.language}`)
    .pipe(
      map((result:MovieResponse)=> result.results as Movie[])
    )
  }

  getMoviesByType(type: string, page = 1):Observable<Movie[]> {
    return this.http.get<MovieResponse>(`${this.apiMovieUrl}/movie/${type}?page=${page}&api_key=${this.apiKey}&language=${this.language}`)
    .pipe(
      map((result:MovieResponse)=>result.results)
    )
  }

  getSimilarMovies(id: number):Observable<Movie[]> {
    return this.http.get<MovieResponse>(`${this.apiMovieUrl}/movie/${id}/similar?api_key=${this.apiKey}&language=${this.language}`)
      .pipe(map((result:MovieResponse) => result.results));
  }

  getMovieById(id: number):Observable<Movie> {
    return this.http.get<Movie>(`${this.apiMovieUrl}/movie/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMovieVideos(id: number):Observable<Video[]> {
    return this.http.get<VideosResponse>(`${this.apiMovieUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=${this.language}`)
      .pipe(map((result:VideosResponse) => result.results));
  }

  getMovieCast(id: number):Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.apiMovieUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=${this.language}`)
      .pipe(map((result:CreditsResponse) => result.cast));
  }
}
