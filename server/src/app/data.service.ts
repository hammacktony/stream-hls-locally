import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _data$: Subject<any> = new Subject();
  get data$() { return this._data$.asObservable(); }

  constructor() { }

  public newVideo(url: string, time: number) {
    this._data$.next({ src: url, time: time })
    return this._data$.asObservable()
  }
}
