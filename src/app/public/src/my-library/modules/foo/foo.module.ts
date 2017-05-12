import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFooComponent } from './foo.component';

@NgModule({
  declarations: [
    MyFooComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyFooComponent
  ]
})
export class MyFooModule { }
