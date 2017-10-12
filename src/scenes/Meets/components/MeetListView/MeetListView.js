// @flow
import React from 'react';
import MeetListItem from '../MeetListItem';
import { Input } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

const Search = Input.Search;

type Props = {
  meets: Array<Object>
};

const MeetListView = ({ meets }: Props) => {
  return (
    <Flex auto column m={3}>
      <PaddedSearch size="large" placeholder="Search for a Meet" />
      {meets.map((meet, i) => <StyledMeetItem key={i} meet={meet} />)}
    </Flex>
  );
};

const StyledMeetItem = styled(MeetListItem)`
  margin-bottom: 20px;
`;

const PaddedSearch = styled(Search)`
  margin-bottom: 15px;
`;

export default MeetListView;
