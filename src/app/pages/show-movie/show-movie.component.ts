import { Component, inject, input, signal } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';

import { AsyncPipe, CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { VideoComponent } from '../../features/video/components/video/video.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { environment } from '../../../environments/environment.development';
import { Movie } from '../../shared/models/movie.interface';
import { Cast } from '../../shared/models/credit.interface';
import { Video } from '../../shared/models/video.interface';
import { MovieComponent } from '../../features/movie/components/movie/movie.component';

const initialMovieState = {
  adult:false,
    backdrop_path:'',
    genre_ids:[],
    id:0,
    original_language:'',
    original_title:'',
    overview:'',
    popularity:0,
    poster_path:'',
    release_date: new Date(),
    title:'',
    video:true,
    vote_average:0,
    vote_count:0
}

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [VideoComponent, AsyncPipe, DatePipe, CurrencyPipe, SlicePipe, MovieComponent],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent {
  movieId = input<number>()

  private readonly moviesSvc = inject(MoviesService);

  public movie = signal<Movie>(initialMovieState)
  public movieCast = signal<Cast[]>([]);
  public movieVideos = signal<Video[]>([]);
  public similarMovies = signal<Movie[]>([]);
  public imagesBaseUrl = environment.imagesBaseUrl;
  public showVideo = signal<boolean>(false);

  ngOnInit() {
    this.getMovieById(this.movieId()!)
    this.getCastById(this.movieId()!)
    this.getMovieVideos(this.movieId()!)
    this.getSimilarMovies(this.movieId()!)
  }

  getMovieById(id:number){
    this.moviesSvc.getMovieById(id).subscribe({
      next:r=>this.movie.set(r)
    })
  }

  getCastById(id:number){
    this.moviesSvc.getMovieCast(id).subscribe({
      next:r=>this.movieCast.set(r)
    })
  }

  getMovieVideos(id:number){
    this.moviesSvc.getMovieVideos(id).subscribe({
      next:r=>this.movieVideos.set(r)
    })
  }

  getSimilarMovies(id:number){
    this.moviesSvc.getSimilarMovies(id).subscribe({
      next:r=>this.similarMovies.set(r)
    })
  }

  openVideo() {
    this.showVideo.set(true);
  }
  closeVideo() {
    this.showVideo.set(false);
  }
}
