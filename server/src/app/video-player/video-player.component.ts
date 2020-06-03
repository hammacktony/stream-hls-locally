import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { UrlService } from '../url.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit {

  url: string = null;

  @ViewChild('target', { static: true }) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  options: {};
  player: videojs.Player;
  subs: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private urlService: UrlService,
  ) { }

  ngOnInit() {
    // instantiate Video.js
    this.subs.push(
      this.urlService.data$.subscribe(url => {
        this.options = {
          autoplay: true, controls: true, sources: {
            src: url
          }
        }
        // console.log(this.options)
        this.makePlayer()
      })
    )
  }

  makePlayer() {
    if (this.player) {
      this.player.dispose();
    }
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log("Video loading..");
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }

    this.subs.forEach(x => x.unsubscribe())
  }

}
