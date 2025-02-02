import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../components/App';

export default function Root({
  store,
}: {
  store: any,
}) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
