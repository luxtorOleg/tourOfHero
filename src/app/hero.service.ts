import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import {Hero} from './hero';
import {MessagesService} from './messages.service';


@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(private http: HttpClient, private messagesService: MessagesService) {
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero (hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((heroes: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  private log(message: string) {
    this.messagesService.add('HeroService: ' + message);
  }
}
