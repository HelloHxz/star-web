import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../router';

export default (config) => {
  ReactDOM.render(<Router />, config.root || document.body);
};
