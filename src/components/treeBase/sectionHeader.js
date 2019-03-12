import React from 'react';

class TreeItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        { data.label }
      </div>
    );
  }
}


export default TreeItem;
