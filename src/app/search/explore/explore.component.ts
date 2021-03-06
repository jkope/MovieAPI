import { Component, OnInit } from '@angular/core';
import {MovieAPIService} from "../../API/movie-api.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {LoaderFixService} from "../../shared/loader-fix.service";
import {Observable} from "rxjs";
import {APIMovie} from "../../shared/apimovie";
import {APINowPlaying} from "../../shared/apinow-playing";
import {APISearchResult} from "../../shared/apisearch-result";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private movieApi: MovieAPIService,
    private loader: LoadingController,
    private router: Router,
    private loadingService: LoaderFixService
  ) { }

  private latest$: Observable<APIMovie>;
  private nowPlaying$: Observable<APINowPlaying>;
  private popular$: Observable<APISearchResult>;
  private topRated$: Observable<APISearchResult>;
  private upcoming$: Observable<APINowPlaying>;

  ngOnInit(): void {
    this.latest$ = this.movieApi.getLatest(1);
    this.nowPlaying$ = this.movieApi.getNowPlaying(1);
    this.popular$ = this.movieApi.getPopular(1);
    this.topRated$ = this.movieApi.getTopRated(1);
    this.upcoming$ = this.movieApi.getUpcoming(1);
  }

  async goToMovie(movieId): Promise<any> { // add async for loader
    if(!this.loadingService.checkDestroy()){
      this.loadingService.isLoading();
      const loading = await this.loader.create({
      });
      loading.present().then(_ => {
        this.router.navigate(['details', movieId]);
      });
    } else {
      this.router.navigate(['details', movieId]);
    }
  }

}
