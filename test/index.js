var assert = require('assert');
var equal = require('assert-dir-equal');
var Wukong = require('wukong');
var markdown = require('..');

describe('wukong-markdown', function(){
  it('should convert markdown files', function (done) {
    Wukong('test/fixtures/basic')
      .use(markdown({
        smartypants: true
      }))
      .build(function *() {
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });

  it('should allow a "keys" option', function(done){
    Wukong('test/fixtures/keys')
      .use(markdown({
        keys: ['custom'],
        smartypants: true
      }))
      .build(function *(file) {
        assert.equal('<p><em>a</em></p>\n', file.custom);
        done();
      });
  });
});
