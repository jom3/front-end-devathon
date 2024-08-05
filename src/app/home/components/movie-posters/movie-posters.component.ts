import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SlicePipe } from '@angular/common';
import { Movie } from '../../../shared/models/movie.interface';
import { MoviesService } from '../../../shared/services/movies.service';
register();

@Component({
  selector: 'home-movie-posters',
  standalone: true,
  imports: [SlicePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './movie-posters.component.html',
  styleUrl: './movie-posters.component.css'
})
export class MoviePostersComponent implements OnInit{
  public movies = signal<Movie[]>([])
  private readonly movieService = inject(MoviesService)

  ngOnInit(): void {
    this.getUpcomingMovies()
  }

  getUpcomingMovies(){
    this.movieService.getUpcomingMovies().subscribe({
      next: r=>{
        this.movies.set(r)
      },
      error:e=>console.log(e)
    })
  }
}
