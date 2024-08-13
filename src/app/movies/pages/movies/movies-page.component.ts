import { DatePipe, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../shared/models/movie.interface';
import {
  MoviesService,
} from '../../../shared/services/movies.service';
import { environment } from '../../../../environments/environment.development';
import { MovieCardComponent } from "../../../shared/components/movie-list/components/movie-card/movie-card.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterModule, DatePipe, SlicePipe, MovieCardComponent, SpinnerComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  public movies = signal<Movie[]>([])
  public imagesBaseUrl = environment.imagesBaseUrl;

  private moviesSvc = inject(MoviesService);

  date = new Date();
  monthName = this.date.toLocaleString('es-ES', { month: 'long' });
  year = this.date.getFullYear();


  ngOnInit() {
    this.getMoviesByType('popular');
  }

  getMoviesByType(type:string){
    this.moviesSvc.getMoviesByType(type).subscribe({
      next:r=> this.movies.set(r),
      error:e=> console.log(e)
    })
  }
}
