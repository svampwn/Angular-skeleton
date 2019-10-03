import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(private domSanitizer: DomSanitizer,) {
      const baseAssets = './assets/svg/';
  }

  ngOnInit() {

  }

}
