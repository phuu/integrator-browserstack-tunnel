# integrator-browserstack-tunnel

Browserstack tunnel plugin for [integrator][integrator].

## Table of contents

* [Install](#install)
* [Use](#use)
* [License](#license)

## Install

```
npm install --save integrator-browserstack-tunnel
```

## Use

In your integrator config file:

```js
import BrowserstackTunnel from 'integrator-browserstack-tunnel';

export default {
  suite: './suite',
  configurations: {
    browserstack: {
      plugins: [
        new BrowserstackTunnel('<your Browserstack local key>')
      ],
      common: {
        hub: 'http://hub.browserstack.com/wd/hub',
        capabilities: {
          'browserstack.local': true,
          ...
        }
      },
      targets: [
        ...
      ]
    }
  }
};
```

## License

Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[integrator]: https://github.com/phuu/integrator
