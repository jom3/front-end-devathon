import {
  AfterViewInit,
  Component,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MoviesService } from '../../../shared/services/movies.service';
import { SearchService } from './../../../shared/services/search.service';

import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  NgIf,
  SlicePipe,
} from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { Cast } from '../../../shared/models/credit.interface';
import { Movie } from '../../../shared/models/movie.interface';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { AuthService } from '../../../auth/services';

const initialMovieState = {
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  id: 0,
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: new Date(),
  title: '',
  video: true,
  vote_average: 0,
  vote_count: 0,
};

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    SlicePipe,
    RouterOutlet,
    JsonPipe,
    MaterialModule,
    NgIf,
  ],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent implements AfterViewInit {
  //Material table
  displayedColumns: string[] = [
    'title',
    'cine',
    'hall',
    'seats',
    'start',
    'finish',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  movieId = input<number>();
  data: any;

  private readonly moviesSvc = inject(MoviesService);
  private readonly searchService = inject(SearchService);

  public movie = signal<Movie>(initialMovieState);
  public movieCast = signal<Cast[]>([]);
  public similarMovies = signal<Movie[]>([]);
  public imagesBaseUrl = environment.imagesBaseUrl;
  readonly router = inject(Router);
  readonly userSvc = inject(AuthService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    const id = this.movieId;
    this.dataSource.paginator = this.paginator;
    this.searchService.getNowPlayingMovies(id()).subscribe((r) => {
      debugger;
      this.dataSource.data = r;
    });
  }

  ngOnInit() {
    this.getMovieById(this.movieId()!);
    this.getCastById(this.movieId()!);
    this.getSimilarMovies(this.movieId()!);
  }

  getMovieById(id: number) {
    this.moviesSvc.getMovieById(id).subscribe({
      next: (r) => this.movie.set(r),
    });
  }

  getCastById(id: number) {
    this.moviesSvc.getMovieCast(id).subscribe({
      next: (r) => this.movieCast.set(r),
    });
  }

  getSimilarMovies(id: number) {
    this.moviesSvc.getSimilarMovies(id).subscribe({
      next: (r) => this.similarMovies.set(r),
    });
  }

  onClick(element: any) {
    this.router.navigate([`/movies/booking`], { state: element });
  }
}
