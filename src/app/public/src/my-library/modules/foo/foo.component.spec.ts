import { ComponentFixture, TestBed } from '@angular/core/testing';

import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { MyFooComponent } from './foo.component';
import { MyConfigService } from '../shared';

class MockSkyAppConfig {
  public runtime: any = {};
  public skyux: any = {
    name: 'test'
  };
}

describe('MyFooComponent', () => {
  let component: MyFooComponent;
  let fixture: ComponentFixture<MyFooComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyFooComponent
      ],
      providers: [
        {
          provide: MyConfigService,
          useClass: MockSkyAppConfig
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFooComponent);
    component = fixture.componentInstance;
  });

  it('should output the name from config', () => {
    fixture.detectChanges();
    expect(fixture).toExist();
    expect(component.name).toBe('test');
  });
});
