import React from 'react';
import {
  Route, Utils, Vbox, Hbox, Menu,
} from 'star-web';
import ThemeBlocks from '../../theme';

const data = [
  {
    icon: 'iconfont icon-folder-open',
    label: '关于',
    key: 'dashboard/about',
  },
  {
    icon: 'iconfont icon-reconciliation',
    label: '快速上手',
    key: 'dashboard/quickstart',
  },
  {
    label: 'Router 路由',
    icon: 'iconfont icon-printer',
    children: [
      { label: 'Hash & History 路由', key: 'dashboard/router' },
      { label: 'GlobalPage 全局页面', key: 'dashboard/globalpage' },
    ],
  },
  {
    label: '数据状态',
    icon: 'iconfont icon-printer',
    children: [
      { label: 'Mobx', key: 'dashboard/mobx' },
      { label: 'AJAX', key: 'dashboard/ajax' },
    ],
  },
  {
    icon: 'iconfont icon-reconciliation',
    label: '主题',
    key: 'dashboard/theme',
  },
  {
    label: '组件',
    icon: 'iconfont icon-team',
    children: [
      {
        label: '布局组件',
        children: [
          { label: 'Grid 栅栏布局', key: 'dashboard/grid' },
          { label: 'TableLayout 表格布局', key: 'dashboard/tableLayout' },
          { label: 'VBox 垂直布局', key: 'dashboard/vbox' },
          { label: 'HBox 水平布局', key: 'dashboard/hbox' },
          { label: 'Group 组', key: 'dashboard/group' },
          { label: 'Tabs 页签', key: 'dashboard/tabs' },
          { label: 'Modal 弹出层', key: 'dashboard/modal' },
          { label: 'Drawer 抽屉', key: 'dashboard/drawer' },
        ],
      },
      {
        label: '表单组件',
        children: [
          { label: 'Button 按钮', key: 'dashboard/button' },
          { label: 'Form 表单', key: 'dashboard/form' },
          { label: 'Input 文本输入', key: 'dashboard/input' },
          { label: 'CheckBox 复选框', key: 'dashboard/checkbox' },
          { label: 'CheckGroup 复选框组', key: 'dashboard/checkgroup' },
          { label: 'Radio 单选框', key: 'dashboard/radio' },
          { label: 'Select 选择', key: 'dashboard/select' },
          { label: 'Table 表格', key: 'dashboard/table' },
        ],
      },
      {
        label: '功能组件',
        children: [
          { label: 'PopView 弹出层', key: 'dashboard/popview' },
          { label: 'Tooltip 气泡提示', key: 'dashboard/tooltip' },
          { label: 'Popover 泡芙', key: 'dashboard/popover' },
          { label: 'Icon 图标', key: 'dashboard/icon' },
          { label: 'DropDown 下拉选择', key: 'dashboard/dropdown' },
          { label: 'Spin 加载指示器', key: 'dashboard/spin' },
          { label: 'Message 消息', key: 'dashboard/message' },
          { label: 'Image 图片', key: 'dashboard/image' },
          { label: 'Swiper 幻灯片', key: 'dashboard/swiper' },
          { label: 'Tree 树状', key: 'dashboard/tree' },
        ],
      },
    ],
  }, {
    label: '打包发布',
    key: 'dashboard/package',
    icon: 'iconfont icon-linechart',
  },
];

class DashBoard extends React.Component {
  go = () => {
    Utils.route.push('dashboard/other', { id: 12, url: 'http://www.xx.com/23/12?params=参数&p=1', name: '参数?#@' });
  }

  onMenuItemClick = (params) => {
    console.log(params);
  }

  render() {
    return (
      <Vbox>
        <Vbox.Panel style={{ height: 50, borderBottom: '1px solid #eee' }}>
          <ThemeBlocks />
          <button type="button" onClick={this.go.bind(this)}>dashboard/other</button>
        </Vbox.Panel>
        <Vbox.Panel>
          <Hbox>
            <Hbox.Panel style={{ width: 170, borderRight: '1px solid #eee' }}>
              <Menu onItemClick={this.onMenuItemClick.bind(this)} offset={15} data={data} />
            </Hbox.Panel>
            <Hbox.Panel>
              <Route {...this.props} />
            </Hbox.Panel>
          </Hbox>
        </Vbox.Panel>
      </Vbox>
    );
  }
}

export default DashBoard;
