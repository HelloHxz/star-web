import React from 'react';
import {
  Route, Utils, Vbox, Hbox,
} from 'star-web';
import ThemeBlocks from '../../theme';

class DashBoard extends React.Component {
  go = () => {
    Utils.route.push('dashboard/other', { id: 12, url: 'http://www.xx.com/23/12?params=参数&p=1', name: '参数?#@' });
  }

  render() {
    return (
      <Vbox>
        <Vbox.Panel style={{ height: 50, borderBottom: '1px solid #eee' }}>
          <ThemeBlocks />
        </Vbox.Panel>
        <Vbox.Panel>
          <Hbox>
            <Hbox.Panel style={{ width: 130, backgroundColor: '#f2f3f4' }}>
              <button type="button" onClick={this.go.bind(this)}>dashboard/other</button>
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
