import { Component } from '@angular/core';

import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class LibrarySampleComponent {
  constructor(
    public configService: SkyAppConfig
  ) { }
}
