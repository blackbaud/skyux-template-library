import { NgModule } from '@angular/core';
import { FooModule } from './modules/foo/foo.module';

@NgModule({
  exports: [
    FooModule
  ]
})
export class MyModule { }
