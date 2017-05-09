import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './foo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooComponent
  ],
  declarations: [
    FooComponent
  ]
})
export class FooModule { }
