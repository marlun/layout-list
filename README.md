# layout-list

A collection of functions that mutates a layout structure that looks like
the following:

```js
[
  { id: 0, parent: null, direction: 'column' },
  { id: 1, parent: 0, active: true },
  { id: 2, parent: 0, direction: 'row' },
  { id: 3, parent: 2 },
  { id: 4, parent: 2 },
]
```

The above structure would look something like this:

```
+-----------------+
|      ACTIVE     |
+--------+--------+
|        |        |
+--------+--------+
```

Sometimes we try to make smart decisions to where the active should move if
there are several options. Contributions are very welcome but please
prioritize readability right after correctness.

## Usage

```js
const LayoutManager = require('layout-list')

const layout = [
  { id: 0, parent: null, direction: 'column' },
  { id: 1, parent: 0, active: true },
  { id: 2, parent: 0, direction: 'row' },
  { id: 3, parent: 2 },
  { id: 4, parent: 2 },
]

LayoutManager.moveActiveDown(layout)
```

## API

Fow now the functions mutate the data structure and will return undefined,
to make things cleaner the undefined return type has been hidden bellow.

### `moveActiveLeft (list: Array)`

Move the active state to the window left of the currently active window.

### `moveActiveRight (list: Array)`

Move the active state to the window right of the currently active window.

### `moveActiveUp (list: Array)`

Move the active state to the window above the currently active window.

### `moveActiveDown (list: Array)`

Move the active state below the currently active window.

### `splitBelowActive (list: Array)`

Create a new horizontal split.

If the parent to the active window contains windows split horizontally a new
window is added to the end.

If the parent to the active window contains windows split vertically, we
convert the active window into a container window and add two new windows
inside it.

### `splitBelowActive (list: Array)`

Create a new vertical split.

If the parent to the active window contains windows split vertically a new
window is added to the end.

If the parent to the active window contains windows split horizontally, we
convert the active window into a container window and add two new windows
inside it.

## License

MIT
