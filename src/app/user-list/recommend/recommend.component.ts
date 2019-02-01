import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {MovieAPIService} from "../../API/movie-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private movieAPI: MovieAPIService,
              private router: Router) { }

  id: number;
  title: string;
  recommendations$;

  ngOnInit() {
    this.id = this.navParams.data.movieId;
    this.title = this.navParams.data.title;
    this.recommendations$ = this.movieAPI.getRecommended(this.id);
  }

  close() {
    this.modalController.dismiss();
  }

  async goToMovie(movieID) {
    await this.router.navigate(['details', movieID]);
    this.modalController.dismiss();
  }

}