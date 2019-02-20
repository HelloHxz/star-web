
import React from 'react';

const Themes = [
  {
    key: 'theme_a',
    name: '红',
    Theme: () => { return import(/* webpackChunkName: "theme_a" */ './theme_a.less'); },
    color: '#e64343',
  },
  {
    key: 'theme_b',
    name: 'b站粉',
    Theme: () => { return import(/* webpackChunkName: "theme_b" */ './theme_b.less'); },
    color: '#f25d8e',
  },
];

export default class ThemeBlocks extends React.Component {
  themeChange = (data) => {
    data.Theme().then(() => {
      document.documentElement.className = data.key;
    }).catch(() => {

    });
  }

  render() {
    const themeBlocks = [];
    for (let i = 0, j = Themes.length; i < j; i += 1) {
      const item = Themes[i];
      themeBlocks.push(<div
        key={item.key}
        onClick={this.themeChange.bind(this, item)}
        style={{
          cursor: 'pointer',
          backgroundColor: item.color,
          marginRight: 20,
          width: 30,
          height: 30,
          display: 'inline-block',
        }}
      />);
    }
    return (<div>{themeBlocks}</div>);
  }
}
