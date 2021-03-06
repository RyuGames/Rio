const fs = require('fs');

function getRioRC(path) {
  if (path) {
    // eslint-disable-next-line
    const rc = require(`${path}/.riorc.js`);
    return rc;
  }
  return {};
}

function formatEndpoint(route) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;
  return parts;
}

function writeToFile(fileName, content) {
  /* istanbul ignore next */
  if (process.env.JEST_WORKER_ID === undefined) {
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.log(`Failed to write ${fileName} due to error ${err}`);
        return;
      }
      console.log(`${fileName} was written successfully`);
    });
  }
}

function removeModule(route, module) {
  const parts = route.split(module);
  const withoutModule = parts.length === 1 ? parts[0] : parts[1];
  return withoutModule;
}

function isInModule(route, module) {
  let parts = route.split('/');
  parts.shift();
  parts = `/${parts.join('/')}`;
  return parts.startsWith(module);
}

function isInMiscModule(route) {
  return route.split('/').length === 2;
}

module.exports = {
  getRioRC,
  formatEndpoint,
  writeToFile,
  removeModule,
  isInModule,
  isInMiscModule,
};
