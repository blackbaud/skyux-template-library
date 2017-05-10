import { NgModule } from '@angular/core';

import { MyModule } from '@blackbaud/my-library';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [MyModule],
  exports: [MyModule],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
