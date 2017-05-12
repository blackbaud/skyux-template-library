import { Component, OnInit } from '@angular/core';

import { MyConfigService } from '../shared';

@Component({
  selector: 'foo-bar',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class MyFooComponent implements OnInit {
  public name: string;

  constructor(
    private configService: MyConfigService) { }

  public ngOnInit(): void {
    this.name = this.configService.skyux.name;
  }
}
