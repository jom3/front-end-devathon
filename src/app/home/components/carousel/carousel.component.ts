import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SlicePipe } from '@angular/common';
import { MoviesService } from '../../../shared/services/movies.service';
import { Movie } from '../../../shared/models/movie.interface';
import { RouterLink } from '@angular/router';
register();

@Component({
  selector: 'home-carousel',
  standalone: true,
  imports: [SlicePipe, RouterLink],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{
  public movies = signal<Movie[]>([])
  private readonly movieSvc = inject(MoviesService)

  ngOnInit(): void {
    this.getNowPlayingMovies()
  }

  getNowPlayingMovies(){
    this.movieSvc.getNowPlayingMovies().subscribe({
      next:r=>{
        this.movies.set(r)
      },
      error:e=>console.log(e)
    })
  }
}
