import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SpinnerComponent, PaginationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SpinnerComponent, PaginationComponent],
})
export class SharedModule {}
