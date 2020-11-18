import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    AlertComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    AlertComponent,
    CommonModule,
  ],
})
export class SharedModule { }
