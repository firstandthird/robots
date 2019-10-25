## robots

A super simple robots.txt generator for javascript.

Follows the Google robots specificiation https://developers.google.com/search/reference/robots_txt

### Example Usage

```js
const robots = require('@firstandthird/robots');

const config = {
  rules: [
    {
      userAgent: ['msnbot', 'slurp'],
      disallow: ['/']
    },
    {
      userAgent: ['*'],
      disallow: ['/documentation'],
      allow: ['/documentation/public/*'] // optional
    }
  ],
  sitemap: [ // optional, must be absolute url
    'https://example.com/sitemap.xml',
    'https://example.com/sitemap-documentation.xml'
  ]
};

// output this with a web request...
const output = robots(config);
```

The robots method can also take a custom logger. Defaults to console.log

```js
const output = robots(config, (tags, data) => console.log(tags, data));
```

If you don't pass a config the default config is used which is currently:

```js
const defaults = {
  rules: [
    {
      userAgent: ['*'],
      disallow: [],
      allow: ['/']
    }
  ],
  sitemap: []
};
```