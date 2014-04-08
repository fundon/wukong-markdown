# wukong-markdown [![Build Status](https://travis-ci.org/fundon/wukong-markdonw.svg)](https://travis-ci.org/fundon/wukong-markdown)

A Wukong plugin to convert markdown files.

### JavaScript Usqge

```js
var markdown = require('wukong-markdown');

wukong.use(markdown({
  smartypants: true,
  gfm: true,
  tables: true
}));
```

### License

MIT
