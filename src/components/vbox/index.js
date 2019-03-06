import React from 'react';
import Box from '../hbox/box';
import './index.less';

export default class VBox extends React.Component {
  render() {
    return <Box {...this.props} boxType="vbox" />;
  }
}


VBox.Panel = Box.Panel;
