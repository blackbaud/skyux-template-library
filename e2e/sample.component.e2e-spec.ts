import {
  expect,
  SkyHostBrowser
} from '@blackbaud/skyux-lib-e2e';

describe('Sample component', () => {
  it('should match baseline screenshot', (done) => {
    SkyHostBrowser.get('/');
    expect('lib-sample').toMatchBaselineScreenshot(done, {
      breakpoint: 'sm'
    });
  });
});
