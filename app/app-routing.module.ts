// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
// import { HeroesComponent} from './heroes/heroes.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { StockquoteComponent } from './stockquote/stockquote.component';

const routes: Routes = [
  // This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  // This causes the App to start at the Dashboard, since the default www link has not "path" appended to it.
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent },
  
  // This first path defines the Default Component that will be displayed on the Home Page.
  { path: '', redirectTo: '/stockquote', pathMatch: 'full' },
  { path: 'stockquote', component: StockquoteComponent },
]

@NgModule({
  exports: [
    RouterModule
  ],

  imports: [
    RouterModule.forRoot(routes)
  ],
})

export class AppRoutingModule { }
