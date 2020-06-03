import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlService } from './url.service';
import { element } from 'protractor';
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
    private urlService: UrlService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // instantiate Video.js
    this.subs.push(
      this.route.queryParams.subscribe(param => {
        const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/stream/" + param['stream'] + "/index.m3u8";
        // const url = `${location.protocol}://location.hostname:8080/stream/${param['stream']}/index.m3u8`
        this.urlService.newVideo(url)
      })
    )
    this.subs.push(
      this.urlService.data$.subscribe((data) => this.currentUrl = data)
    )
  }

  ngOnDestroy() {
    this.subs.forEach(element => element.unsubscribe())
  }

}
