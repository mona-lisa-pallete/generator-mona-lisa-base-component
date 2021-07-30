'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fsExtra = require('fs-extra');
const hasYarn = require('has-yarn');
const path = require('path');
const pkg = require('../../package.json');

const getDefaultGitUserInfo = require('./getDefaultGitUserInfo');

const files = [
  './_.npmrc',
  './_package.json',
  './_README.md',
  './_tsconfig.build.json',
  './_tsconfig.json',
  './_webpack.core.config.js',
  './src/_index.tsx',
];
const folders = ['./src'];

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red(pkg.name)} !`));
    const ProjectId = path.basename(this.destinationPath());
    const prompts = [
      {
        type: 'text',
        name: 'packageName',
        message: 'Enter your packageName?',
        default: `${ProjectId}`,
      },
      {
        type: 'text',
        name: 'description',
        message: 'Enter your description?',
        default: `> TODO: description`,
      },
      {
        type: 'text',
        name: 'author',
        message: 'Enter package author?',
        default: getDefaultGitUserInfo(),
      },
      {
        type: 'text',
        name: 'scope',
        message: 'Enter your packages scope',
        default: '',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      // console.log(props);
      props['packageName'] = props['scope']
        ? `${props['scope']}/${props['packageName']}`
        : props['packageName'];
      this.props = props;
    });
  }

  writing() {
    folders.forEach(folder => {
      const folderPath = this.destinationPath(folder);
      fsExtra.ensureDirSync(folderPath);
    });

    files.forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(remove_(file)), this.props);
    });
  }

  install() {
    if (this.options['skip-install']) {
      return;
    }

    const packageManager = hasYarn()
      ? {
          yarn: true,
          npm: false,
        }
      : {
          yarn: false,
          npm: true,
        };
    this.installDependencies({
      bower: false,
      ...packageManager,
    });
  }
};

function remove_(str) {
  return str.replace(/^_/, '').replace(/\/_/g, '/');
}
