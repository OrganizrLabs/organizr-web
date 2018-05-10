/**
 * Configuration file for managing static details of the application
 */
import * as React from 'react';
import Dashboard from 'scenes/Dashboard';
import Todos from 'scenes/Todos';
import Notes from 'scenes/Notes';
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
    path: '/dashboard',
    icon: 'dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/todos',
    icon: 'checkbox',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/notes',
    icon: 'note',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/calendar',
    icon: 'calendar',
    name: 'Calendar',
    component: Calendar
  }
];

export const defaultRoute = {
  path: '/login',
  icon: 'user',
  name: 'Login',
  component: Login
};
