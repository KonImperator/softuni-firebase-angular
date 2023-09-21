import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { EncodeUriPipe } from './pipes/encode-uri.pipe';

@NgModule({
  declarations: [SpinnerComponent, PaginationComponent, EncodeUriPipe],
  imports: [CommonModule, RouterModule],
  exports: [SpinnerComponent, PaginationComponent, EncodeUriPipe],
})
export class SharedModule {}
