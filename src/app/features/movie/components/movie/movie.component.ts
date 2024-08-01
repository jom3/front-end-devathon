import { Component, Input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie';
import { imagesBaseUrl } from '../../../../shared/services/movies.sertice';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  standalone: true,
  imports: [],
})
export class MovieComponent {
  public imagesBaseUrl = imagesBaseUrl;
  @Input() movie!: Movie;
}
