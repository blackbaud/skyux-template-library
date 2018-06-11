const fs = require('fs-extra');
const rimraf = require('rimraf');
const path = require('path');

const {
  exec,
  dirHasChanges
} = require('./utils');

const baselineScreenshotsDir = 'screenshots-baseline-local';
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

let gitOriginUrl;
let gitFeatureBranch;
let gitOriginSshUrl = 'git@github.com:blackbaud/skyux-template-library.git';

const cloneDir = 'temp-master';

function handleBaselineScreenshots() {
  const buildId = new Date().getTime();
  const branch = 'master';
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

    .then(() => exec('git', ['checkout', '-b', branch], opts))
    .then(() => exec('git', ['add', baselineScreenshotsDir], opts))
    .then(() => exec('git', ['commit', '-m', `Build #${buildId}: Added new baseline screenshots.`], opts))
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
      gitUrl = output.replace(/\n/g, '');
      return gitUrl;
    })

    // Get name of feature branch:
    // https://stackoverflow.com/a/12142066/6178885
    .then(() => exec('git', ['rev-parse', '--abbrev-ref', 'HEAD']))
    .then((output) => {
      gitFeatureBranch = output.replace(/\n/g, '');
      return gitFeatureBranch;
    })

    // Check baseline screenshots.
    .then(() => dirHasChanges(baselineScreenshotsDir))
    .then((hasChanges) => {
      if (hasChanges) {
        return handleBaselineScreenshots();
      }
    });
}

checkScreenshots()
  .then(() => {
    rimraf.sync(cloneDir);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    rimraf.sync(cloneDir);
    process.exit(1);
  });
