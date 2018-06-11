const fs = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');

const {
  exec,
  dirHasChanges
} = require('./utils');

const webdriverDir = 'skyux-visualtest-results';
const diffScreenshotsDir = 'screenshots-diff-local';
const baselineScreenshotsDir = 'screenshots-baseline-local';
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

let gitOriginUrl;
let gitFeatureBranch;
let gitOriginSshUrl = 'git@github.com:blackbaud/skyux-template-library.git';

/**
 * Commit diff screenshots to a remote repo.
 */
function handleDiffScreenshots() {
  const buildId = new Date().getTime();
  const opts = { cwd: webdriverDir };
  const name = gitOriginUrl.split('/')[1].replace('.git', '');
  const diffBranch = `${name}_${gitFeatureBranch}_${buildId}-webdriver`;

  return Promise.resolve()
    // .then(() => exec('git', ['config', '--global', 'user.email', '"sky-build-user@blackbaud.com"']))
    // .then(() => exec('git', ['config', '--global', 'user.name', '"Blackbaud Sky Build User"']))
    // .then(() => exec('git', ['clone', `https://${githubAccessToken}@github.com/blackbaud/skyux-visualtest-results.git`, '--single-branch', webdriverDir]))
    .then(() => exec('git', ['clone', 'git@github.com:blackbaud/skyux-visualtest-results.git', '--single-branch', webdriverDir]))
    .then(() => fs.copy(diffScreenshotsDir, path.resolve(webdriverDir, diffScreenshotsDir)))
    .then(() => exec('git', ['checkout', '-b', diffBranch], opts))
    .then(() => exec('git', ['add', diffScreenshotsDir], opts))
    .then(() => exec('git', ['commit', '-m', `"Build #${buildId}: Screenshot results pushed to skyux-visualtest-results."`], opts))
    .then(() => exec('git', ['push', '-fq', 'origin', diffBranch], opts))
    .then(() => {
      return Promise.reject(new Error([
        `SKY UX visual test failure!`,
        `Screenshots may be viewed at:`,
        `https://github.com/blackbaud/skyux-visualtest-results/tree/${diffBranch}`
      ].join('\n')));
    });
}

function handleBaselineScreenshots() {
  const buildId = new Date().getTime();
  const cloneDir = 'temp-master';
  const branch = 'delete-test'; // Should be 'master'
  const opts = { cwd: cloneDir };

  return Promise.resolve()
    // .then(() => exec('git', ['config', '--global', 'user.email', '"sky-build-user@blackbaud.com"']))
    // .then(() => exec('git', ['config', '--global', 'user.name', '"Blackbaud Sky Build User"']))
    // .then(() => exec('git', ['clone', `https://${githubAccessToken}@github.com/blackbaud/skyux-visualtest-results.git`, '--single-branch', webdriverDir]))
    .then(() => exec('git', ['clone', gitOriginSshUrl, '--single-branch', cloneDir]))
    .then(() => fs.copy(
      baselineScreenshotsDir,
      path.resolve(cloneDir, baselineScreenshotsDir)
    ))

    // TODO: Remove this line before pushing!
    .then(() => exec('git', ['checkout', '-b', branch], opts))

    .then(() => exec('git', ['add', baselineScreenshotsDir], opts))
    .then(() => exec('git', ['commit', '-m', `"Build #${buildId}: Added new baseline screenshots."`], opts))
    .then(() => exec('git', ['push', '-fq', 'origin', branch], opts))
    .then(() => {
      return console.log('Done!');
    });
}

function checkScreenshots() {
  return Promise.resolve()
    // Get origin URL.
    .then(() => exec('git', ['config', '--get', 'remote.origin.url']))
    .then((output) => {
      gitOriginUrl = output.replace(/\n/g, '');
      return gitOriginUrl;
    })

    // Get name of feature branch:
    // https://stackoverflow.com/a/12142066/6178885
    .then(() => exec('git', ['rev-parse', '--abbrev-ref', 'HEAD']))
    .then((output) => {
      gitFeatureBranch = output.replace(/\n/g, '');
      return gitFeatureBranch;
    })

    // Check diff screenshots.
    .then(() => dirHasChanges(path.resolve(diffScreenshotsDir, 'diff')))
    .then((hasChanges) => {
      return (hasChanges)
        ? handleDiffScreenshots()
        : dirHasChanges(baselineScreenshotsDir);
    })

    // Check baseline screenshots.
    .then((hasChanges) => {
      if (hasChanges) {
        return handleBaselineScreenshots();
      }
    });
}

checkScreenshots()
  .then(() => {
    console.log('No visual changes detected.');
    rimraf.sync(webdriverDir);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    rimraf.sync(webdriverDir);
    process.exit(1);
  });
