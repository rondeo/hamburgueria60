const fromChrome = [
  'mobile-s',
  'mobile-m',
  'mobile-l',
  'tablet-s',
  'tablet-l',
  'desktop',
  'laptop',
  'laptop-l',
  '4k',
  'universe'
];

export const size = (() => {
  const s = {};

  /* eslint-disable dot-notation, prettier/prettier */
  s['mobile-s'] = { min: 0, max: 320 };
  s['mobile-m'] = { min: 375 };
  s['mobile-l'] = { min: 425 };
  s['tablet-s'] = { min: 653 };
  s['tablet-l'] = { min: 768 };
  s['desktop'] = { min: 1024 };
  s['laptop'] = { min: 1024 };
  s['laptop-l'] = { min: 1440 };
  s['4k'] = { min: 2560 };
  s['universe'] = { min: Number.MAX_SAFE_INTEGER };
  /* eslint-enable */

  fromChrome.forEach((resolution, i) => {
    const next = s[fromChrome[i + 1]];
    if (next) {
      s[resolution].max = next.min - 1;
    }
  });

  s.mobile = { min: 0, max: 652 };
  s.tablet = { min: 653, max: 1023 };

  return s;
})();

export const types = (() => {
  const withLimits = {};
  const withoutLimits = {};

  Object.keys(size).forEach(resolution => {
    const queries = [];
    if (size[resolution].min) {
      queries.push(`min-width: ${size[resolution].min}px`);
    }

    withoutLimits[resolution] = {
      mediaQuery: `(${queries.join(' and ')})`,
      minWidth: size[resolution].min
    };

    if (size[resolution].max) {
      queries.push(`max-width: ${size[resolution].min}px`);
    }

    withLimits[resolution] = {
      mediaQuery: `(${queries.join(' and ')})`,
      minWidth: size[resolution].min,
      maxWidth: size[resolution].max
    };
  });

  return { withLimits, withoutLimits };
})();

export const device = (type, { only } = {}) =>
  only
    ? types.withLimits[type].mediaQuery
    : types.withoutLimits[type].mediaQuery;

export default device;
