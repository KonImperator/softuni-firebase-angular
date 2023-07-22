import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ]
})
export class CoreModule { }
