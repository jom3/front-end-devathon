import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MoviesService,
  imagesBaseUrl,
} from '../../shared/services/movies.sertice';

import { Actor } from '../../features/movies/models/credit';
import { Movie } from '../../features/movies/models/movie';
import { Video } from '../../features/movies/models/video';
import { VideoComponent } from '../../video/components/video/video.component';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent {
  @Input() movieId: string = '';
  private moviesService = inject(MoviesService);
  public movieObs$!: Observable<Movie>;
  public movieCastObs$!: Observable<Actor[]>;
  public movieVideosObs$!: Observable<Video[]>;
  public similarMoviesObs$!: Observable<Movie[]>;
  public imagesBaseUrl = imagesBaseUrl;
  private activatedRouter = inject(ActivatedRoute);
  public showVideo = false;

  ngOnInit() {
    this.activatedRouter.params
      .pipe(map((p) => p['movieId']))
      .subscribe((id) => {
        console.log(id);
        this.movieObs$ = this.moviesService.fetchMovieById(id);
        this.movieCastObs$ = this.moviesService.fetchMovieCast(id);
        this.movieVideosObs$ = this.moviesService.fetchMovieVideos(id);
        this.similarMoviesObs$ = this.moviesService.fetchSimilarMovies(id);
      });
  }

  openVideo() {
    this.showVideo = true;
  }
  closeVideo() {
    this.showVideo = false;
  }
}
