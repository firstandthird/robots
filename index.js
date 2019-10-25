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

// eslint-disable-next-line no-console
function generateRobots(config, log = console.log) {
  if (!config) {
    log(['robots', 'warning'], {
      message: 'No config supplied. Falling back to defaults'
    });

    config = defaults;
  }

  const lines = [];

  config.rules.forEach(rule => {
    rule.userAgent.forEach(ua => lines.push(`user-agent: ${ua}`));

    if (Array.isArray(rule.disallow)) {
      rule.disallow.forEach(disallow => lines.push(`disallow: ${disallow}`));
    }

    if (Array.isArray(rule.allow)) {
      rule.allow.forEach(allow => lines.push(`allow: ${allow}`));
    }

    lines.push('\n');
  });

  if (Array.isArray(config.sitemap)) {
    config.sitemap.forEach(sitemap => lines.push(`sitemap: ${sitemap}`));
  }

  return lines.join('\n').trim();
}

module.exports = generateRobots;
