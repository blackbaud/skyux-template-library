const fs = require('fs-extra');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');

const tempDir = '.skypagese2etemp'
const webdriverDir = `${tempDir}/skyux-visualtest-results`;
// const diffDirName = 'screenshots-diff';
const diffDirName = 'screenshots-baseline-local';
const githubToken = process.env.GH_TOKEN;

// const headBranch = 'master';
const headBranch = 'visual-test-2';

function log(buffer) {
  console.log(buffer.toString('utf8'));
}

function exec(cmd, args, opts) {
  // const fragments = command.split(' ');
  // const args = fragments.slice(1, fragments.length);
  // const cmd = fragments[0];

  console.log(`Running command: ${cmd} ${args.join(' ')}`);

  const cp = spawn(cmd, args, opts);

  return new Promise((resolve, reject) => {
    let output;

    cp.stdout.on('data', (data) => {
      log(data);
      output = data.toString('utf8');
    });

    let error;
    cp.stderr.on('data', (data) => {
      error = data.toString('utf8');
    });

    cp.on('error', (err) => {
      error = err;
    });

    cp.on('exit', (code) => {
      if (code === 0) {
        resolve({
          code,
          output
        });
        return;
      }

      reject(error);
    });
  });
}

function handleDiffScreenshots() {
  // Short-circuit for now.
  return Promise.resolve();

  const buildId = new Date().getTime();

  let diffBranch = `skyux2-${buildId}-webdriver`;
  let isSavageBranch = (false);

  if (isSavageBranch) {
    diffBranch += '-savage';
  }

  // exec('git', ['config', '--global', 'user.email', '"sky-build-user@blackbaud.com"']);
  // exec('git', ['config', '--global', 'user.name', '"Blackbaud Sky Build User"']);

  return exec('git', ['clone', 'git@github.com:blackbaud/skyux-visualtest-results.git', '--branch', headBranch, '--single-branch'], { cwd: tempDir })
  // return exec('git', ['clone', `https://${githubToken}@github.com/blackbaud/skyux2.git`, '--branch', headBranch, '--single-branch'], { cwd: tempDir })
    .then(() => fs.copy(`${tempDir}/${diffDirName}`, `${webdriverDir}/${diffDirName}`))
    .then(() => exec('git', ['checkout', '-b', diffBranch], { cwd: webdriverDir }))
    .then(() => exec('git', ['add', '.'], { cwd: webdriverDir }))
    .then(() => exec('git', ['commit', '-m', `"Build ${buildId} webdriver screenshot results pushed to skyux-visualtest-results"`], { cwd: webdriverDir }))
    .then(() => exec('git', ['push', '-fq', 'origin', diffBranch], { cwd: webdriverDir }))
    .then(() => {
      return Promise.reject(new Error([
        `Test failure results may be viewed at:`,
        `https://github.com/blackbaud/skyux-visualtest-results/tree/${diffBranch}`
      ].join('\n')));
    });
}

let gitUrl;
let featureBranch;

new Promise((resolve, reject) => {
  rimraf(tempDir, (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  })
})
  // Get origin URL.
  .then(() => exec('git', ['config', '--get', 'remote.origin.url']))
  .then((result) => {
    gitUrl = result.output.replace(/\n/g, '');
    return gitUrl;
  })

  // Get name of feature branch:
  // https://stackoverflow.com/a/12142066/6178885
  .then(() => exec('git', ['rev-parse', '--abbrev-ref', 'HEAD']))
  .then((result) => {
    featureBranch = result.output.replace(/\n/g, '');
    return featureBranch;
  })

  // Create baselines from master branch.
  .then(() => exec('git', ['clone', '--depth', '1', gitUrl, '--branch', headBranch, '--no-single-branch', tempDir]))
  .then(() => exec('npm', ['install'], { cwd: tempDir }))
  .then(() => exec('skyux', ['e2e'], { cwd: tempDir }))

  // Compare screenshots generated within feature branch.
  // .then(() => exec('git', ['fetch', 'origin', featureBranch, '--depth', '1'], { cwd: tempDir }))
  .then(() => exec('git', ['checkout', featureBranch], { cwd: tempDir }))
  .then(() => exec('git', ['status'], { cwd: tempDir }))
  .then(() => exec('npm', ['install'], { cwd: tempDir }))
  .then(() => exec('skyux', ['e2e'], { cwd: tempDir }))

  // Commit any diff screenshots to a remote, third-party repo.
  .then(() => exec('git', ['status', diffDirName, '--porcelain'], { cwd: tempDir }))
  .then((result) => {
    // Untracked files are prefixed with '??'
    // https://git-scm.com/docs/git-status/1.8.1#_output
    // https://stackoverflow.com/a/6978402/6178885
    const hasChanges = (result.output && result.output.indexOf('??') > -1);

    if (hasChanges) {
      return handleDiffScreenshots(result);
    }

    return Promise.resolve();
  })

  // Delete temp folder.
  // .then((result) => rimraf.sync(tempDir))

  .then(() => {
    console.log('SKY UX visual test complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.log('SKY UX visual test failure:\n', err);
    process.exit(1);
  });
