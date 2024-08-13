import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SlicePipe } from '@angular/common';
import { Movie } from '../../../shared/models/movie.interface';
import { MoviesService } from '../../../shared/services/movies.service';
import { MovieListComponent } from '../../../shared/components/movie-list/movie-list.component';
register();

@Component({
  selector: 'home-movie-posters',
  standalone: true,
  imports: [SlicePipe, MovieListComponent, MovieListComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './movie-posters.component.html',
  styleUrl: './movie-posters.component.css'
})
export class MoviePostersComponent implements OnInit{
  public nowPlayingMovies = signal<Movie[]>([])
  public upcomingMovies = signal<Movie[]>([])
  private readonly movieService = inject(MoviesService)

  ngOnInit(): void {
    this.getNowPlayingMovies()
    this.getUpcomingMovies()
  }

  getUpcomingMovies(){
    this.movieService.getUpcomingMovies().subscribe({
      next: r=>{
        this.upcomingMovies.set(r)
      },
      error:e=>console.log(e)
    })
  }

  getNowPlayingMovies(){
    this.movieService.getNowPlayingMovies().subscribe({
      next:r=>{
        this.nowPlayingMovies.set(r)
      },
       error:e=>console.log(e)
    })
  }

}
