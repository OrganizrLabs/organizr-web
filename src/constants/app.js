/**
 * Configuration file for managing static details of the application
 */
import * as React from 'react';
import Dashboard from 'scenes/Dashboard';
import Todos from 'scenes/Todos';
import Reminders from 'scenes/Reminders';
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
    icon: 'appstore-o',
    name: 'Dashboard',
    component: Dashboard,
    scenes: []
  },
  {
    path: '/todos',
    icon: 'check-square-o',
    name: 'Todos',
    component: Todos,
    scenes: []
  },
  {
    path: '/reminders',
    icon: 'exclamation-circle-o',
    name: 'Reminders',
    component: Reminders,
    scenes: []
  },
  {
    path: '/notes',
    icon: 'file-text',
    name: 'Notes',
    component: Notes,
    scenes: []
  },
  {
    path: '/calendar',
    icon: 'calendar',
    name: 'Calendar',
    component: Calendar,
    scenes: []
  }
];

export const defaultRoute = {
  path: '/login',
  icon: 'user',
  name: 'Login',
  component: Login
};
