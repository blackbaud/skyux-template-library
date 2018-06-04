const spawn = require('cross-spawn');

function exec(cmd, args, opts) {
  console.log(`Running command: ${cmd} ${args.join(' ')}`);
  const cp = childProcessSpawn(cmd, args, opts);

  cp.stdout.on('data', data => log(data));
  cp.stderr.on('data', data => log(data));

  return new Promise((resolve, reject) => {
    cp.on('error', err => reject(log(err)));
    cp.on('exit', code => resolve(code));
  });
}

/**
 * - Login to GitHub
 * - If diffs, commit to remote repo.
 */

exec('git', [
  'checkout',
  'master',
  '--single-branch'
]);
