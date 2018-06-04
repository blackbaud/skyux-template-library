const spawn = require('cross-spawn');

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
      output = data.toString('utf8').replace(/\n/g, '');
    });

    cp.stderr.on('data', (data) => {
      log(data);
    });

    cp.on('error', (err) => {
      log(err);
      reject(err);
    });

    cp.on('exit', (code) => {
      resolve({
        code,
        output
      });
    });
  });
}

/**
 * - Login to GitHub
 * - If diffs, commit to remote repo.
 */

let branch;
let tempDir = '.skypagese2etemp'

exec('git config --get remote.origin.url')
  .then((result) => exec(`git clone ${result.output} ${tempDir}`))

  // Get name of feature branch:
  // https://stackoverflow.com/a/12142066/6178885
  .then(() => exec('git rev-parse --abbrev-ref HEAD'))
  .then((result) => {
    branch = result.output;
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

  .then((result) => {
    console.log('hey!', result);
  });
