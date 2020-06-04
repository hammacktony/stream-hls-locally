import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { DataService } from '../data.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('target', { static: true }) target: ElementRef;

  private player: videojs.Player;
  private subs: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private _data$: DataService,
  ) { }

  ngOnInit() {
    // instantiate Video.js
    this.subs.push(
      this._data$.data$.subscribe(data => {
        const options = {
          autoplay: true, controls: true, sources: {
            src: data.src
          }
        }

        this.player = videojs(this.target.nativeElement, options);
        if (data.time) {
          this.player.currentTime(data.time)
        }
        this.player.play()

      })
    )
  }


  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }

    this.subs.forEach(x => x.unsubscribe())
  }

}
