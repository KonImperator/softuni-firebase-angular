import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
  // { path: '**', component: HomeComponent },
  // 404 ERROR COMPONENT TO MAKE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
