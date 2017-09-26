// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';

const ui = new UiStore();

const StoreProvider = ({ children }: { children: React.Node }) =>
  <Provider ui={ui}>
    {children}
  </Provider>;

export default StoreProvider;
