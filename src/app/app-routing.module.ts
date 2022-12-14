import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { CatalogsDetailComponent } from './pages/catalogs-detail/catalogs-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'catalogs', component: CatalogsComponent},
  {path: 'catalogs-detail/:id', component: CatalogsDetailComponent},
  {path: "", redirectTo: "home", pathMatch: "full",},
  {path: '**', redirectTo: "home", pathMatch: "full",},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
