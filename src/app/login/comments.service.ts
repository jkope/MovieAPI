import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Movie} from '../shared/movie';
import {Comment} from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
      private db: AngularFirestore
  ) { }


  addMovie(movie, comment: Comment): void {
      const dbMovieData = {
          title: movie.title,
          genres: movie.genres,
          movieID: movie.id,
          pic: movie.poster_path
      };
      this.db.collection(`allComments`).doc(`${dbMovieData.movieID}`).set(dbMovieData).then(ignoreVar => {
          this.db.collection(`allComments/${dbMovieData.movieID}/comments`).doc(`${comment.userID}`).set(comment);
      });
  }
  updateMovie(movie: Movie) {
      this.db.collection(`allComments`).doc(`${movie.movieID}`).update(movie);
  }
  getCommentsFor(movieID: number) {
      return this.db.collection(`allComments/${movieID}/comments`).valueChanges();
  }
  getMovieData(movieID: number) {
      return this.db.collection(`allComments`).doc(`${movieID}`).valueChanges();
  }
  getUserComment(movieID: number, userID: string) {
      return this.db.collection(`allComments/${movieID}/comments`).doc(userID).valueChanges();
  }
  updateAComment(movieID: number, comment: Comment): void {
    this.db.collection(`allComments/${movieID}/comments`).doc(comment.userID).update({'comment': comment.comment});
  }
  deleteCommment(movieID: number, userID: string): void {
      this.db.collection(`allComments/${movieID}/comments`).doc(userID).delete();
  }
}
