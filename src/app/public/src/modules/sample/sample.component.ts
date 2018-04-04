import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyAppConfig
} from '@blackbaud/skyux-builder/runtime';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class MyLibrarySampleComponent implements OnInit {
  public appSettings: any;

  constructor(
    private appConfig: SkyAppConfig
  ) { }

  public ngOnInit() {
    this.appSettings = this.appConfig.skyux.appSettings;
  }
}
