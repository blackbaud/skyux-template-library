const fs = require('fs-extra');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');

function log(buffer) {
  console.log(buffer.toString('utf8'));
}

function exec(command, opts) {
  const fragments = command.split(' ');
  const args = fragments.slice(1, fragments.length);
  const cmd = fragments[0];

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

const tempDir = '.skypagese2etemp'
const webdriverDir = `${tempDir}/skyux-visualtest-results`;
const githubToken = '';

let featureBranch;

function handleDiffScreenshots() {
  const buildId = new Date();

  let diffBranch = `skyux2-${buildId}-webdriver`;
  let isSavageBranch = (false);

  if (isSavageBranch) {
    diffBranch += '-savage';
  }

  // git config --global user.email "sky-build-user@blackbaud.com"
  // git config --global user.name "Blackbaud Sky Build User"
  return exec(`git clone --quiet https://${githubToken}@github.com/blackbaud/skyux-visualtest-results.git > /dev/null`, { cwd: tempDir })
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.copy(
          `${tempDir}/screenshots-diff`,
          `${webdriverDir}/screenshots-diff`,
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    })
    .then(() => exec(`git checkout -b ${diffBranch}`, { cwd: webdriverDir }))
    .then(() => exec(`git commit -m "Build ${buildId} webdriver screenshot results pushed to skyux-visualtest-results"`, { cwd: webdriverDir }))
    .then(() => exec(`git push -fq origin ${diffBranch} > /dev/null`, { cwd: webdriverDir }))
    .then(() => {
      return Promise.reject(new Error(
        `skyux-visualtest-results webdriver successfully updated.\n`,
        `Test results may be viewed at`,
        `https://github.com/blackbaud/skyux-visualtest-results/tree/${diffBranch}`
      ));
    });
}

exec('git config --get remote.origin.url')
  .then((result) => {
    const gitUrl = result.output.replace(/\n/g, '');
    return exec(`git clone ${gitUrl} ${tempDir}`);
  })

  // Get name of feature branch:
  // https://stackoverflow.com/a/12142066/6178885
  .then(() => exec('git rev-parse --abbrev-ref HEAD'))
  .then((result) => {
    featureBranch = result.output.replace(/\n/g, '');
    return result;
  })

  // Create baselines from master branch.
  .then(() => exec('npm install', { cwd: tempDir }))
  .then(() => exec('skyux e2e', { cwd: tempDir }))

  // Run tests against feature branch.
  .then(() => exec(`git checkout ${featureBranch}`, { cwd: tempDir }))
  .then(() => exec('git status', { cwd: tempDir }))
  .then(() => exec('npm install', { cwd: tempDir }))
  .then(() => exec('skyux e2e', { cwd: tempDir }))

  // Commit any diff screenshots to a remote, third-party repo.
  .then(() => exec('git status screenshots-diff --porcelain', { cwd: tempDir }))
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
    console.log('DONE.');
    process.exit(0);
  })
  .catch((err) => {
    throw err;
    process.exit(1);
  });
