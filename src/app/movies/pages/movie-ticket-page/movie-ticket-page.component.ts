import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../../../shared/models/video.interface';
import { MoviesService } from '../../../shared/services/movies.service';
import { SlicePipe } from '@angular/common';
import { VideoComponent } from '../../components/video/video.component';
import { JwtService } from '../../../shared';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-movie-ticket-page',
  standalone: true,
  imports: [SlicePipe, VideoComponent, SpinnerComponent],
  templateUrl: './movie-ticket-page.component.html',
  styleUrl: './movie-ticket-page.component.css'
})
export class MovieTicketPageComponent {
  private movieId = signal<number>(0)
  public isLogged = signal<boolean>(false)
  public showVideo = signal<boolean>(false);
  private readonly moviesSvc = inject(MoviesService)
  private readonly jwtService = inject(JwtService)
  public movieVideos = signal<Video[]>([]);
  private readonly ac = inject(ActivatedRoute)

  constructor(){
    this.ac.paramMap.subscribe(params=>{
      this.movieId.set(Number(params.get('movieId')))
    })
    this.getMovieVideos(this.movieId()!)
    this.isLogged.set(this.jwtService.isLogged())
  }

  getMovieVideos(id:number){
    this.moviesSvc.getMovieVideos(id).subscribe({
      next:r=>this.movieVideos.set(r)
    })
  }

  openVideo() {
    this.showVideo.set(true);
  }
  closeVideo() {
    this.showVideo.set(false);
  }

}
