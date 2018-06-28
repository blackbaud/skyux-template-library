import {
  expect,
  SkyHostBrowser
} from '@blackbaud/skyux-lib-e2e';

describe('Action button', () => {
  it('should match previous action button screenshot', (done) => {
    SkyHostBrowser.get('visual-tests/sample');
    expect('#lib-sample-screenshot').toMatchBaselineScreenshot(done, {
      breakpoint: 'sm'
    });
  });
});
