Disclaimer
======
This is  a fork of [react-dropdown](https://github.com/fraserxu/react-dropdown)
by [fraserxu](https://github.com/fraserxu), so huge thanks to them!
I just needed multiselect for a project and forked,
so since I don't expect anyone else to really use this,
I'm not going to spend a lot of time rewriting the docs.
What follows is basically just react-dropdown's README after
a `s/react-dropdown/\0-multiselect/g`, so things are bound not
to be accurate AT ALL.
Might rewrite it at some point if I feel like it.

react-dropdown-multiselect
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Simple Dropdown component for React, inspired by [react-select](https://github.com/JedWatson/react-select)


### Why

* The default HTML select element is hard to style
* And sometime we also want grouped menus
* if you want more advanced select, check [react-select](https://github.com/JedWatson/react-select)

### Installation

```
$ npm install react-dropdown-multiselect  --save
```

### Changelog

If you want to support React version under v0.13, use react-dropdown@v0.6.1

### Usage

```JavaScript
'use strict';

import React from 'react';
import Dropdown from '../';

class App extends React.Component {

  constructor() {
    this.state = {
      selected: { value: 'two', label: 'Two'}
    }
  }

  _onSelect(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render() {

    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      {
        type: 'group', name: 'group1', items: [
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' }
        ]
      },
      {
        type: 'group', name: 'group2', items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' }
        ]
      }
    ]

    let defaultOption = this.state.selected

    return (
      <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
    )
  }

}
React.render(<App />, document.body)

```

**Run example**

```
$ cd example && npm install && npm run watch
```

### License

MIT | Build for [CSViz](https://csviz.org) project @[Wiredcraft](http://wiredcraft.com)

[npm-image]: https://img.shields.io/npm/v/react-dropdown-multiselect.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-dropdown-multiselect
[downloads-image]: http://img.shields.io/npm/dm/react-dropdown-multiselect.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-dropdown-multiselect
