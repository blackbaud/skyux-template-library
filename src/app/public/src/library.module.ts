import { NgModule } from '@angular/core';

import { LibrarySampleModule } from './modules/sample';

@NgModule({
  exports: [
    LibrarySampleModule
  ]
})
export class LibraryModule { }
