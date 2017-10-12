// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag } from 'antd';
import styled from 'styled-components';

type Props = {
  meet: Object,
  className?: string
};

const MeetListItem = ({ meet, className }: Props) => {
  return (
    <FlexCard
      className={className}
      title={
        <Link to={`/meets/${meet.id}`}>
          {meet.name}
        </Link>
      }
      extra={meet.date}
    >
      {meet.teams.map(team =>
        <Tag>
          <Link to={`/teams/${team.id}`}>
            {team.name}
          </Link>
        </Tag>
      )}
    </FlexCard>
  );
};

const FlexCard = styled(Card)`
  flex: 1 1 auto;
`;

export default MeetListItem;
