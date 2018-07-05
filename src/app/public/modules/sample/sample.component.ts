import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  MySampleService
} from './sample.service';

@Component({
  selector: 'lib-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySampleComponent implements OnInit {
  public name: string;

  constructor(
    private sampleService: MySampleService
  ) { }

  public ngOnInit(): void {
    this.name = this.sampleService.appSettings.myLibrary.name;
  }
}
