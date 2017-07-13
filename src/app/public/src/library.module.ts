import { NgModule } from '@angular/core';
import { LibrarySampleModule } from './modules/sample/sample.module';

@NgModule({
  exports: [
    LibrarySampleModule
  ]
})
export class LibraryModule { }

export { LibraryConfigService } from './modules/shared/config.service';
