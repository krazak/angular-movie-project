import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MovieResponse, Movie } from '../models/movie.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'https://swapi.co/api/films/';  // URL to web api

  constructor(private http: HttpClient) { }

  /* 
     getMovies(): Observable<MovieResponse[]> {
     return this.http.get<MovieResponse[]>(this.moviesUrl).pipe(
       tap(_ => console.log('fetched movies')),
       catchError(this.handleError<MovieResponse[]>('getMovies', []))
     );
   }
   */

  public getMovies(): Observable<MovieResponse> {
    return this.http.get<any>(this.moviesUrl).pipe(
      tap(_ => console.log('fetched movies')),
      catchError(this.handleError<MovieResponse>('getMovies'))
    );
  }


   public getMovie(id: number): Observable<Movie> {
      const url = `${this.moviesUrl}${id}`;
      return this.http.get<Movie>(url).pipe(
        tap(_ => console.log(`fetched movie id=${id}`)),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
    }
   


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
