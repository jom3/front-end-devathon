import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../../shared/models/movie';
import { MaterialModule } from '../../../../shared/modules/material/material.module';
import { imagesBaseUrl } from '../../../../shared/services/movies.service';
import { VideoComponent } from '../../../video/components/video/video.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  standalone: true,
  imports: [VideoComponent, RouterModule, DatePipe, MaterialModule],
})
export class MovieComponent {
  public imagesBaseUrl = imagesBaseUrl;
  @Input() movie!: Movie;
}
