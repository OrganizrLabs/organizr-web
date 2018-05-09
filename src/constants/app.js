/**
 * Configuration file for managing static details of the application
 */
import * as React from 'react';
import Home from 'scenes/Home';
import Login from 'scenes/Login';
import Calendar from 'scenes/Calendar';

export type Scene = {
  path: string,
  icon: string,
  name: string,
  component: React.Component<{}>
};

export const title: string = 'Organizr';
export const shortTitle: string = 'Organizr';
export const scenes: Array<Scene> = [
  {
    path: '/login',
    icon: 'user',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    icon: 'home',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    icon: 'calendar',
    name: 'Calendar',
    component: Calendar
  }
];

export const defaultRoute = scenes[0];
