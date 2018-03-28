import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppConfig
} from '@blackbaud/skyux-builder/runtime';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { MyLibrarySampleComponent } from './sample.component';

class MockSkyAppConfig {
  public runtime = {};
  public skyux = {
    name: 'test',
    appSettings: {
      myLibrary: {
        name: 'library'
      }
    }
  };
}

describe('Sample component', () => {
  let component: MyLibrarySampleComponent;
  let fixture: ComponentFixture<MyLibrarySampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyLibrarySampleComponent
      ],
      providers: [
        { provide: SkyAppConfig, useClass: MockSkyAppConfig }
      ]
    });

    fixture = TestBed.createComponent(MyLibrarySampleComponent);
    component = fixture.componentInstance;
  });

  it('should output the name from config', () => {
    fixture.detectChanges();
    expect(fixture).toExist();
    expect(component.getSetting('name')).toBe('library');
  });
});
