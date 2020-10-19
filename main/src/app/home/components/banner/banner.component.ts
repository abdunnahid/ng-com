import { Component, OnInit } from '@angular/core';
import { IBannerCarouselImage } from '@nghacks/banner-carousel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  data: IBannerCarouselImage[] = [];

  constructor() { }

  ngOnInit(): void {

    new Array(4).fill('s').forEach((_, index) => {
      this.data.push({
        src: `assets/banner/banner${index + 1}.png`,
        id: index
      });
    });

  }

  onimageClick(e: IBannerCarouselImage): void {
    console.log("BannerCarouselConsumerComponent -> onimageClick -> e", e)
  }
}
