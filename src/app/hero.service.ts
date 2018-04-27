import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessagesService} from './messages.service';

@Injectable()
export class HeroService {
  constructor(private messagesService: MessagesService) {
  }

  getHeroes(): Observable<Hero []> {
    this.messagesService.add('HeroService: fetched hero');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messagesService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));

  }
}
