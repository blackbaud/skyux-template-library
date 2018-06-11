const spawn = require('cross-spawn');
const fs = require('fs');

function dirHasChanges(dir) {
  // We need to use the file system in case the consumer has added the
  // screenshot directories to their .gitignore.
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(files.length > 0);
    });
  });
}

function exec(cmd, args, opts) {
  const cp = spawn(cmd, args, opts);

  return new Promise((resolve, reject) => {
    let output;
    cp.stdout.on('data', (data) => {
      output = data.toString('utf8');
    });

    let error;
    cp.stderr.on('data', (data) => {
      error = data.toString('utf8');
    });

    cp.on('error', (err) => {
      reject(err);
    });

    cp.on('exit', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = {
  dirHasChanges,
  exec
};
