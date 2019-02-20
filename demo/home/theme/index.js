
import React from 'react';

const Themes = [
  {
    key: 'star-web-theme',
    name: '蓝',
    Theme: null,
    color: '#1890ff',
  },
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
    const rootWrapper = document.getElementById('star-root-id');
    if (data.Theme) {
      data.Theme().then(() => {
        rootWrapper.className = data.key;
      }).catch(() => {
      });
    } else {
      rootWrapper.className = data.key;
    }
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
