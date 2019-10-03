import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
  /* Lazy-loading routing
  * 

  {
    
    path: '**',
    loadChildren: () => import('./app.module').then(m => m.AppModule),
    data: {},
    canActivate: []
    
  }

  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
