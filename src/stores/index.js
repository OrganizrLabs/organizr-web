// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';
import UserStore from './UserStore';
import Media from './Media';

// singletons
import client from './Client';

export const ui = new UiStore();
export const user = new UserStore();
export const media = new Media(client);

media.getMediaEntries();

const StoreProvider = ({ children }: { children: React.Node }) =>
  <Provider ui={ui} user={user} client={client} media={media}>
    {children}
  </Provider>;

export default StoreProvider;
