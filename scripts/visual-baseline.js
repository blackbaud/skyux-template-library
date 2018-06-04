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
  .then(() => exec('git status screenshots-diff', { cwd: tempDir }))
  .then((result) => {
    const hasChanges = (result.indexOf('nothing to commit') > -1);

    if (hasChanges) {
      return Promise.reject(new Error('There are visual differences!'));
    } else {
      return Promise.resolve();
    }
  })

  // Delete temp folder.
  .then((result) => rimraf.sync(tempDir))
  .then(() => {
    console.log('DONE.');
    process.exit(0);
  })
  .catch((err) => {
    throw err;
    process.exit(1);
  });
