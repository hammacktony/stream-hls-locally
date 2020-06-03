import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private _data$: Subject<any> = new Subject();
  get data$() { return this._data$.asObservable(); }

  constructor() { }

  public newVideo(url: string) {
    this._data$.next(url)
    return this._data$.asObservable()
  }
}
