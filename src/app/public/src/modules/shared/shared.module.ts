import { NgModule } from '@angular/core';

import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';

import { LibraryConfigService } from './config.service';

@NgModule({
  providers: [
    {
      provide: LibraryConfigService,
      useExisting: SkyAppConfig
    }
  ]
})
export class LibrarySharedModule { }
