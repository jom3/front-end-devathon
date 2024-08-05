import { DatePipe } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../../shared/models/movie.interface';
import { MaterialModule } from '../../../../shared/modules/material/material.module';
import { VideoComponent } from '../../../video/components/video/video.component';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'movie-card',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  standalone: true,
  imports: [VideoComponent, RouterModule, DatePipe, MaterialModule],
})
export class MovieComponent {
  movie = input.required<Movie>();
  public imagesBaseUrl = environment.imagesBaseUrl;
}
