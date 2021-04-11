import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { TabulatorComponent } from './components/tabulator/tabulator.component';

const routes: Routes = [
  { path: '', redirectTo: '/tabulator', pathMatch: 'full' },
  { path: 'tabulator', component: TabulatorComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
