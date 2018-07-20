import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppConfig
} from '@blackbaud/skyux-builder/runtime';

import {
  expect
} from '@blackbaud/skyux-lib-testing';

import {
  MySampleComponent
} from './sample.component';

import {
  MySampleService
} from './sample.service';

class MockSkyAppConfig {
  public runtime: any = {};
  public skyux: any = {
    appSettings: {
      myLibrary: {
        name: 'Library'
      }
    }
  };
}

describe('LibrarySampleComponent', () => {
  let component: MySampleComponent;
  let fixture: ComponentFixture<MySampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MySampleComponent
      ],
      providers: [
        MySampleService,
        {
          provide: SkyAppConfig,
          useClass: MockSkyAppConfig
        }
      ]
    });

    fixture = TestBed.createComponent(MySampleComponent);
    component = fixture.componentInstance;
  });

  it('should output the name from config', () => {
    fixture.detectChanges();
    expect(component.name).toBe('Library');
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeAccessible();
  }));
});
