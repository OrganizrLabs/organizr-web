// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Route, withRouter } from 'react-router';
import MeetListView from './components/MeetListView';
import MeetDetail from './components/MeetDetail';

type Props = {
  location: Object
};

// Fake the data for now
const meets = [
  {
    id: 1,
    name: 'Battle in Beantown',
    date: '09/22/2017',
    teams: [
      {
        name: 'Duke',
        id: 2
      },
      {
        name: 'UNC',
        id: 3
      }
    ]
  },
  {
    id: 2,
    name: 'Panorama Farms',
    date: '10/12/2017',
    teams: [
      {
        name: 'Syracuse',
        id: 5
      },
      {
        name: 'Villanova',
        id: 7
      },
      {
        name: 'Louiville',
        id: 8
      }
    ]
  },
  {
    id: 3,
    name: 'Princeton Invitational',
    date: '10/24/2017',
    teams: [
      {
        name: 'Princeton',
        id: 10
      },
      {
        name: 'Cornell',
        id: 11
      }
    ]
  }
];

class Meets extends React.Component<Props> {
  render() {
    const { location } = this.props;
    const hasId = /meets\/[0-9]*/.test(location.pathname);
    return (
      <Layout
        subheader={
          hasId
            ? <span>
                {meets[0].name}
              </span>
            : undefined
        }
      >
        {!hasId && <MeetListView meets={meets} />}
        <Route
          path="/meets/:id"
          component={() => <MeetDetail meet={meets[0]} />}
        />
      </Layout>
    );
  }
}

export default withRouter(Meets);
