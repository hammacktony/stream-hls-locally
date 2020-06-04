import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'hls-client';

  currentUrl: string = 'http://localhost:8080/stream/demo/index.m3u8'
  subs: any[] = [];


  constructor(
    private _data$: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.queryParams.subscribe(params => {
        const url: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/stream/" + params['stream'] + "/index.m3u8";
        const time: number = params["time"] || null
        this._data$.newVideo(url, time)
      })
    )
    this.subs.push(
      this._data$.data$.subscribe((data) => this.currentUrl = data.src)
    )
  }

  ngOnDestroy() {
    this.subs.forEach(element => element.unsubscribe())
  }

}
