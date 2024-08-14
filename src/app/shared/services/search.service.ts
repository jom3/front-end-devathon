import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly apiMovieUrl = environment.apiMovieUrl;
  private readonly apiKey = environment.apiKEY;
  private readonly language = environment.language;

  private readonly http = inject(HttpClient);

  getNowPlayingMovies(moviID: any): Observable<Movie[]> {
    return this.http
      .get<any>(`http://localhost:8080/api/shows/search/${moviID}`)
      .pipe(
        map((result: any) => result),
        tap(console.log)
      );
  }
}
