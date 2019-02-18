import React from 'react';

class Page2 extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      import('./components/index').then((Com)=>{
        console.log(Com);
      }).catch(()=>{});
    },4000)
  }

  render() {
    return (<div>Page2</div>);
  }
}

export default Page2;
