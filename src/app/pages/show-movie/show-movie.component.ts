import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MoviesService,
  imagesBaseUrl,
} from '../../shared/services/movies.service';

import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { VideoComponent } from '../../features/video/components/video/video.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Actor } from '../../shared/models/credit';
import { Movie } from '../../shared/models/movie';
import { Video } from '../../shared/models/video';
import { MaterialModule } from '../../shared/modules/material/material.module';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [
    VideoComponent,
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    MaterialModule,
    SpinnerComponent,
  ],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent {
  //properties
  loaded: boolean = false;
  error: boolean = false;
  public showVideo = false;
  movieDetails: any;
  movieCast: any;
  id: string = '';
  @Input() movieId: string = '';
  private moviesService = inject(MoviesService);
  public movieObs$!: Observable<Movie>;
  public movieCastObs$!: Observable<Actor[]>;
  public movieVideosObs$!: Observable<Video[]>;
  public similarMoviesObs$!: Observable<Movie[]>;
  public imagesBaseUrl = imagesBaseUrl;
  private activatedRouter = inject(ActivatedRoute);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRouter.params
      .pipe(map((p) => p['movieId']))
      .subscribe((id) => {
        this.id = id;
        this.loadMovieDetails();
      });
  }

  openVideo() {
    this.showVideo = true;
  }
  closeVideo() {
    this.showVideo = false;
  }

  loadMovieDetails() {
    this.loaded = true;
    this.movieCastObs$ = this.moviesService.fetchMovieCast(this.id);
    this.movieObs$ = this.moviesService.fetchMovieById(this.id);
    this.movieVideosObs$ = this.moviesService.fetchMovieVideos(this.id);
  }
}
