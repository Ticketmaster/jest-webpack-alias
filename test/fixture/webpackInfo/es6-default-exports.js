var Setup = require('../setup');
var fixture = new Setup();

fixture.readdir = {
  '/top': ['node_modules', 'package.json', 'src', 'test', 'webpack'],
  '/top/test': ['file1.test.js'],
  '/top/src': ['dir1'],
  '/top/src/dir1': ['lib1a.js'],
  '/top/webpack': ['dev.config.js']
};

var webpackProfile = fixture.webpackProfile = 'dev';

var webpackSettings = fixture.webpackSettings = [
  {
    name: webpackProfile,
    resolve: {
      modules: ['/top/src', '/top/bogus_dir'],
      extensions: ["", ".js", ".jsx"],
      // omitted: fallback
      alias: {
        aliasNodeSubdir1Src: 'node1',
        aliasNodeSubdir2Src: 'node1/lib/submodule',
        aliasNodeFileSrc: 'aliasNodeFileDest',
        aliasPlainSubdirSrc: 'dir1/lib1a'
      }
    }
  }
];

fixture.requireContents = {
  '/top/webpack/dev.config.js': {
    __esModule: true,
    'default': webpackSettings
  }
};

fixture.readFile = {
  '/top/package.json': JSON.stringify({
    'jest-webpack-alias': {
      configFile: 'webpack/dev.config.js',
      profile: webpackProfile
    }
  })
};

module.exports = fixture.getExports();
