import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
      HomeComponent,
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: '', component: HomeComponent }
      ]),
    ],
    providers: [],
    bootstrap: [],
    entryComponents: []
  })
  export class HomeModule {
  
  
  }