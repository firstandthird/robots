const tap = require('tap');
const robots = require('../index.js');

tap.test('default to console.log', t => {
  const oldlog = console.log;

  console.log = function(tags, data) {
    t.ok(Array.isArray(tags), 'tags set');
    t.deepEqual(tags, ['robots', 'warning'], 'tags match');
    t.ok(typeof data.message === 'string' && data.message.length, 'message is set');
  };

  robots();

  console.log = oldlog;
  t.end();
});

tap.test('should complain about no config', t => {
  robots(undefined, (tags, data) => {
    t.ok(Array.isArray(tags), 'tags set');
    t.deepEqual(tags, ['robots', 'warning'], 'tags match');
    t.ok(typeof data.message === 'string' && data.message.length, 'message is set');
  });

  t.end();
});

tap.test('should use default config if none passed', t => {
  const output = robots(undefined, () => {});
  const expected = 'user-agent: *\nallow: /';

  t.equal(output, expected, 'output is default');

  t.end();
});

tap.test('handles multiple useragents', t => {
  const config = {
    rules: [
      {
        userAgent: ['*', 'google-bot'],
        disallow: [],
        allow: ['/']
      }
    ],
    sitemap: []
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\nuser-agent: google-bot\nallow: /';

  t.equal(output, expected, 'contains second ua');

  t.end();
});

tap.test('handles multiple rules', t => {
  const config = {
    rules: [
      {
        userAgent: ['*'],
        disallow: ['/'],
        allow: []
      },
      {
        userAgent: ['google-bot'],
        disallow: [],
        allow: ['/']
      }
    ],
    sitemap: []
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\ndisallow: /\n\n\nuser-agent: google-bot\nallow: /';

  t.equal(output, expected, 'contains two rules');

  t.end();
});

tap.test('handles disallow not set', t => {
  const config = {
    rules: [
      {
        userAgent: ['*'],
        allow: ['/']
      }
    ],
    sitemap: []
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\nallow: /';

  t.equal(output, expected, 'contains just allow');

  t.end();
});

tap.test('handles allow not set', t => {
  const config = {
    rules: [
      {
        userAgent: ['*'],
        disallow: ['/']
      }
    ],
    sitemap: []
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\ndisallow: /';

  t.equal(output, expected, 'contains just disallow');

  t.end();
});

tap.test('supports sitemaps', t => {
  const config = {
    rules: [
      {
        userAgent: ['*'],
        disallow: ['/'],
        allow: []
      }
    ],
    sitemap: [
      'http://example.com/sitemap.xml',
      'http://example.com/sitemap-extra.xml'
    ]
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\ndisallow: /\n\n\nsitemap: http://example.com/sitemap.xml\nsitemap: http://example.com/sitemap-extra.xml';

  t.equal(output, expected, 'contains sitemaps');

  t.end();
});

tap.test('handles sitemap not set', t => {
  const config = {
    rules: [
      {
        userAgent: ['*'],
        disallow: ['/']
      }
    ]
  };

  const output = robots(config, () => {});
  const expected = 'user-agent: *\ndisallow: /';

  t.equal(output, expected, 'contains just disallow');

  t.end();
});
