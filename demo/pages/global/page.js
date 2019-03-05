import React, { Fragment } from 'react';

class GlobalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInit: false,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        hasInit: true,
      });
    }, 3000);
  }

  render() {
    const { hasInit } = this.state;
    const { children } = this.props;
    if (!hasInit) {
      return (
        <div>
          欢迎来到StarWeb,正在为您加载...
        </div>
      );
    }
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

export default GlobalPage;
