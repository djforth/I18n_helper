# I18n_helper.js

A little helper to work with [i18n-js][0]

Set i18n-js gem in your rails app as the readme. Although maybe sure you have install i18n-js through npm/yarn.abs

By default the helper will use the lang attribute too set the language.

So:

```html
<html lang="<%= I18n.locale %>"></html>
```

Then in your JS:

```javascript
import i18nHelper from '@morsedigital/i18n_helper';

const t = i18nHelper();

// Basics
p.innerHTML = t('my.key.goes.here', { translate: true }); // looks up 'my.key.goes.here'

// split keys
p.innerHTML = t('my', 'key', 'goes.here', { translate: true }); // looks up 'my.key.goes.here'

// pass option keys
p.innerHTML = t('my', 'key', 'goes.here', { translate: true, foo: 'bar' }); // looks up 'my.key.goes.here' with options {foo: 'bar'}

// Preset part keys
const key = t('my.key');

p.innerHTML = key('goes.here', { translate: true }); // looks up 'my.key.goes.here'

p2.innerHTML = key('another.here', { translate: true }); // looks up 'my.key.another.here'

p3.innerHTML = key('another.here', { translate: true, foo: 'bar' }); // looks up 'my.key.goes.here' with options {foo: 'bar'}

// Preset part keys and options
const key = t('my.key', { foo: 'bar' });

p.innerHTML = key('goes.here', { translate: true, path: 'foo/bar' }); // looks up 'my.key.goes.here' with options {foo: 'bar', path: 'foo/bar'}

p2.innerHTML = key('another.here', { translate: true, path: 'bar/foo' }); // looks up 'my.key.another.here' with options {foo: 'bar', path: 'bar/foo'}
```

# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/morsedigital/i18n_helper/issues

## Contribute

If you'd like to contribute, i18n_helper is written using babel and rollup in ES6.

Please make sure any additional code should be covered in tests (Jest).

If you need to run the test please use:

```bash

yarn test

```

or to rebuild the JS run:

```bash

yarn build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

i18n_helper is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the @morsedigital/select-filter project are licensed under MIT license.

[0]: https://github.com/fnando/i18n-js
