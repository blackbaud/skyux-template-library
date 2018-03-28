import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyAppConfig
} from '@blackbaud/skyux-builder/runtime';

@Component({
  selector: 'my-lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class MyLibrarySampleComponent implements OnInit {
  public libraryName: string;

  constructor(
    private configService: SkyAppConfig
  ) { }

  public ngOnInit(): void {
    this.libraryName = this.getSetting('name');
  }

  public getSetting(key: string): any {
    return this.configService.skyux.appSettings.myLibrary[key];
  }
}
