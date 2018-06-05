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

let branch;
let tempDir = '.skypagese2etemp'

exec('git config --get remote.origin.url')
  .then((result) => {
    const gitUrl = result.output.replace(/\n/g, '');
    return exec(`git clone ${gitUrl} ${tempDir}`);
  })

  // Get name of feature branch:
  // https://stackoverflow.com/a/12142066/6178885
  .then(() => exec('git rev-parse --abbrev-ref HEAD'))
  .then((result) => {
    branch = result.output.replace(/\n/g, '');
    return result;
  })

  // Create baselines from master branch.
  .then(() => exec('npm install', { cwd: tempDir }))
  .then(() => exec('skyux e2e', { cwd: tempDir }))

  // Run tests against feature branch.
  .then(() => exec(`git checkout ${branch}`, { cwd: tempDir }))
  .then(() => exec('git status', { cwd: tempDir }))
  .then(() => exec('npm install', { cwd: tempDir }))
  .then(() => exec('skyux e2e', { cwd: tempDir }))

  // Commit any diff screenshots to a remote, third-party repo.
  .then(() => exec('git status screenshots-baseline-local', { cwd: tempDir }))
  .then((result) => {
    console.log('result?', result);
    const hasChanges = (result.indexOf('nothing to commit') > -1);

    if (hasChanges) {

      // git config --global user.email "sky-build-user@blackbaud.com"
      // git config --global user.name "Blackbaud Sky Build User"
      // git clone --quiet https://${GH_TOKEN}@github.com/blackbaud/skyux-visualtest-results.git skyux-visualtest-results-webdriver > /dev/null
      // cd skyux-visualtest-results-webdriver

      // let branch = `skyux2-${new Date()}-webdriver`;
      // // if [[ $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
      // //   branch="$branch-savage"
      // // fi
      // exec(`git checkout -b ${branch}`);

      // cp -rf ../skyux-spa-visual-tests/screenshots-created/ created-screenshots/

      // mkdir -p failures

      // cp -rf ../skyux-spa-visual-tests/screenshots-diff/ failures/

      // mkdir -p all

      // cp -rf ../skyux-spa-visual-tests/screenshots-baseline/ all/

      // git add -A
      // if [ -z "$(git status --porcelain)" ]; then
      //     echo -e "No changes to commit to skyux visual test webdriver results."
      // else
      //     git commit -m "Travis build $TRAVIS_BUILD_NUMBER webdriver screenshot results pushed to skyux-visualtest-results"
      //     git push -fq origin $branch > /dev/null
      //     echo -e "skyux-visualtest-results webdriver successfully updated.\nTest results may be viewed at https://github.com/blackbaud/skyux-visualtest-results/tree/$branch"
      // fi

      return Promise.reject(new Error('There are visual differences!'));
    } else {
      return Promise.resolve();
    }
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
