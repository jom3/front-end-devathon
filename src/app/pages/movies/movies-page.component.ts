import { DatePipe, NgForOf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { MovieComponent } from '../../features/movie/components/movie/movie.component';
import { Movie } from '../../shared/models/movie';
import { MaterialModule } from '../../shared/modules/material/material.module';
import {
  imagesBaseUrl,
  MoviesService,
} from '../../shared/services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent, MaterialModule, RouterModule, NgForOf, DatePipe],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  public imagesBaseUrl = imagesBaseUrl;
  date = new Date();
  monthName = this.date.toLocaleString('default', { month: 'short' });
  year = this.date.getFullYear();

  private moviesService = inject(MoviesService);
  private pageNumber = 1;
  private destroyRef = inject(DestroyRef);
  public moviesObs$ = this.moviesService.fetchMoviesByType(
    'popular',
    this.pageNumber
  );
  public moviesResults: Movie[] = [];

  ngOnInit() {
    this.moviesObs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.moviesResults = data.results;
      });
  }
}
