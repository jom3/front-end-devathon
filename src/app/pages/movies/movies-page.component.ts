import { NgForOf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieComponent } from '../../features/movie/components/movie/movie.component';
import { Movie } from '../../features/movies/models/movie';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { MoviesService } from '../../shared/services/movies.sertice';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent, MaterialModule, NgForOf],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
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

  onScroll(): void {
    this.pageNumber++;
    console.log('scrolled!!');

    this.moviesObs$ = this.moviesService.fetchMoviesByType(
      'popular',
      this.pageNumber
    );
    this.moviesObs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.moviesResults = this.moviesResults.concat(data.results);
      });
  }
}
