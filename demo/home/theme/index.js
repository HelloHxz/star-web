
import React from 'react';

const Themes = [
  {
    namespace: 'star-web-theme',
    title: '蓝',
    Theme: null,
    color: '#1890ff',
  },
  {
    namespace: 'theme_a',
    title: '红',
    Theme: () => { return import('./theme_a.less'); },
    color: '#e64343',
  },
  {
    namespace: 'theme_b',
    title: 'b站粉',
    Theme: () => { return import('./theme_b.less'); },
    color: '#f25d8e',
  },
];

export default class ThemeBlocks extends React.Component {
  themeChange = (data) => {
    const rootWrapper = document.getElementById('star-root-id');
    if (data.Theme) {
      data.Theme().then(() => {
        rootWrapper.className = data.namespace;
      }).catch(() => {
      });
    } else {
      rootWrapper.className = data.namespace;
    }
  }

  render() {
    const themeBlocks = [];
    for (let i = 0, j = Themes.length; i < j; i += 1) {
      const item = Themes[i];
      themeBlocks.push(<div
        key={item.namespace}
        onClick={this.themeChange.bind(this, item)}
        title={item.title}
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
