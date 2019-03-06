import React from 'react';
import Box from './box';
import './index.less';


export default class HBox extends React.Component {
  render() {
    return <Box {...this.props} boxType="hbox" />;
  }
}


HBox.Panel = Box.Panel;
