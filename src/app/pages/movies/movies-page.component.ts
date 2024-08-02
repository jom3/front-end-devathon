import { DatePipe, NgForOf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { MovieComponent } from '../../features/movie/components/movie/movie.component';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Movie } from '../../shared/models/movie';
import { MaterialModule } from '../../shared/modules/material/material.module';
import {
  imagesBaseUrl,
  MoviesService,
} from '../../shared/services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MovieComponent,
    MaterialModule,
    RouterModule,
    NgForOf,
    DatePipe,
    SpinnerComponent,
    ErrorDialogComponent,
  ],
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
  error: boolean = false;
  loaded: boolean = false;

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    // this.moviesObs$
    //   .pipe(
    //     catchError((error) => {
    //       this.error = true;
    //       this.onError(error);
    //       return throwError(() => error);
    //     }),
    //     takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe((data: any) => {
    //     this.loaded = true;
    //     this.moviesResults = data.results;
    //   });

    this.moviesObs$
      .pipe(
        map((value) => value),
        tap((data) => console.log('data', data.results)),
        delay(1500),
        catchError((err) => {
          console.log('caught mapping error and rethrowing', err);
          let error = err.message;
          this.onError('Eror al cargar los datos. ' + error);
          return of([]);
        }),
        catchError((err) => {
          console.log('caught rethrown error, providing fallback value');
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.loaded = true;
        this.moviesResults = data?.results;
      });
  }

  onError(errores: any) {
    this.error = true;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      height: '300px',
      width: '500px',
      data: {
        message: errores,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
