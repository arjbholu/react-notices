<h1 align="center">
  <br />
  <br />
  Notices
  <br />
  <br />
  <br />
</h1>

<h5 align="center"><code>notices</code> makes implementing global react notices easy.</h5>
<p align="center">
  <a href="https://www.npmjs.com/package/@ninetynine/react-notices">
    <img src="https://badgen.net/npm/v/@ninetynine/react-notices" />
  </a>
  <a href="https://www.npmjs.com/package/@ninetynine/react-notices">
    <img src="https://badgen.net/npm/dt/@ninetynine/react-notices" />
  </a>
  <a href="https://www.npmjs.com/package/@ninetynine/react-notices">
    <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/@ninetynine/react-notices@latest/" />
  </a>
</p>

<br />
<br />

## Contents

* [Installation](#installation)
* [Basic Example](#basic-example)
* [Usage](#usage)
  * [Interaction](#interaction)
  * [Customization](#customization)
    * [Provider](#provider)
    * [Notice](#notice-1)
    * [Styling](#styling)

### Installation

`notices` can be installed using [NPM][npm] or [Yarn][yarn].

```
# Installing with NPM
npm i --save @ninetynine/react-notices
```

```
# Installing with Yarn
yarn add @ninetynine/react-notices
```

---

### Basic Example

`notices` makes implementing global react notices easy by using [React context][react-context].

```jsx
import { Provider, Consumer } from '@ninetynine/react-notices'


<Provider>
  <Consumer>
    {({ notice }) => {
      <button
        onClick={() => (
          notice({
            content: 'Hello, world'
          })
        )}
      >
        Click Me!
      </button>
    }}
  </Consumer>
</Provider>
```

---

### Usage

#### Interaction

When using the `Consumer` the following attributes are returned from the `Provider`:

* `isActive`
* `isQueued`
* `notice`
* `clear`
* `$active`
* `$queue`

##### `isActive`

This function can be used to check if your notice is active or not. Simply pass a key generated from `notice`.
It returns an object containing:

* `bool`: If the given key is active
* `index`: The index of the notice within the active list

##### `isQueued`

This function can be used to check if your notice is queued or not. Simply pass a key generated from `notice`.
It returns an object containing:

* `bool`: If the given key is queued
* `index`: The index of the notice within the queue

##### `notice`

This function can be used to queue the notice ready for displaying. Pass the configuartion as an object for the notice.
The object passed is spread across the `defaultProps` for `Notice` and a generated key if one is not given.

It returns the key of the newly queued notice.

##### `clear`

This function clears the queue and active list.

##### `$active`

This array contains the current active notices. This should only be used for reference and not changed directly.

##### `$queue`

This array contains the current queued notices. This should only be used for reference and not changed directly.

---

#### Customization

##### `Provider`

The `Provider` can be given two props:

* `maxAlerts`
* `eventLoop`

###### `maxAlerts`

This defines how many notices will be shown at once, by default this is `1`.

###### `eventLoop`

This defines how often the `Provider` checks for queue updates, by default this is `500`.

##### `Notice`

The `Notice` can be given a number of props:

* `closeable`
* `timeout`
* `animations`
* `theme`
* `onClose`

###### `closeable`

This defines if the notice can be closed by the user, by default this is `true`.
The class applied dynamically looks like: `state-closeable`.

###### `timeout`

This defines how long it takes until the notice closes, by default this is `2000` (ms).

###### `animations`

`notices` makes use of [`framer-motion`][framer-motion] to make the notices nicely enter and leave the view. Use the following attributes to change the animations:

* `init`
* `visible`
* `hidden`

By default the animations are set up to enter by fading up from the bottom right, and to leave by fading out to the right.

###### `theme`

The default styles has a number of themes, this allows the notice to be styled differently based on importance or context. The following themes are available:

* `light`
* `info`
* `warning`
* `danger`

The class applied dynamically looks like: `display-<theme>`.

###### `onClose`

When using the `Provider` and `Context` this should not be used, as it will be ignored. But this is used for applying external logic once the `hidden` animation has completed.

#### Styling

Within this package there are basic default styles that can be imported using SCSS. Feel free to use your own styles by following the same naming conventions.

```scss
# Using SCSS
@import '@ninetynine/react-notices/dist/notice';
```

Within the SCSS file there are default variables that can be overwritten.

##### `gutter`

The `gutter-*` variables are used to define spacing and padding:

* `gutter`: `20px`
* `gutter-double`: `40px`
* `gutter-half`: `10px`

##### `border-radius`

The `border-radius` variable is used to define the border radius on a notice, by default this is `3px`.

##### `notice-*-normal`

The `notice-*-normal` variables are used to define the basic colors for the default theme:

* `notice-background-normal`: `#000`
* `notice-color-normal`: `#fff`

##### `notice-*-light`

The `notice-*-light` variables are used to define the basic colors for the light theme:

* `notice-background-light`: `#fff`
* `notice-color-light`: `#000`

##### `notice-*-info`

The `notice-*-info` variables are used to define the basic colors for the info theme:

* `notice-background-info`: `#228be6`
* `notice-color-info`: `#000`

##### `notice-*-warning`

The `notice-*-warning` variables are used to define the basic colors for the warning theme:

* `notice-background-warning`: `#fd7e14`
* `notice-color-warning`: `#000`

##### `notice-*-danger`

The `notice-*-danger` variables are used to define the basic colors for the danger theme:

* `notice-background-danger`: `#f03e3e`
* `notice-color-danger`: `#000`


[npm]: http://npmjs.com
[yarn]: https://yarnpkg.com/lang/en
[react-context]: https://reactjs.org/docs/context.html
[framer-motion]: https://www.npmjs.com/package/framer-motion
