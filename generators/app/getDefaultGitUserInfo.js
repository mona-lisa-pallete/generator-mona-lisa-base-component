const { execSync } = require('child_process');

module.exports = getDefaultGitUserInfo;

function getDefaultGitUserInfo() {
  const email = execSync('git config user.email').toString('utf-8');
  const userName = execSync('git config user.name').toString('utf-8');

  return email && userName ? `${removeTr(userName)} <${removeTr(email)}>` : '';
}

function removeTr(str) {
  return str.replace(/[\r\n]/g, '').replace(/\s/g, '');
}
