import { NgModule } from '@angular/core';

import { MyFooModule } from './modules/foo/foo.module';

export { MyConfigService } from './modules/shared';

@NgModule({
  exports: [
    MyFooModule
  ]
})
export class MyModule { }
