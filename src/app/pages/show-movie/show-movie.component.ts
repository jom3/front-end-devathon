import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MoviesService,
  imagesBaseUrl,
} from '../../shared/services/movies.service';

import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { VideoComponent } from '../../features/video/components/video/video.component';
import { Actor } from '../../shared/models/credit';
import { Movie } from '../../shared/models/movie';
import { Video } from '../../shared/models/video';
import { MaterialModule } from '../../shared/modules/material/material.module';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [VideoComponent, AsyncPipe, DatePipe, CurrencyPipe, MaterialModule],
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
