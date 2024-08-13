import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../../../../environments/environment.development';
import { VideoComponent } from '../../../../../movies/components/video/video.component';
import { Movie } from '../../../../models/movie.interface';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'movie-card',
  standalone: true,
  imports: [VideoComponent, RouterModule, DatePipe, MaterialModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  public imagesBaseUrl = environment.imagesBaseUrl;
}
