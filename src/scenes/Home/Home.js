import * as React from 'react';
import { Table } from 'antd';
import Layout from 'components/Layout';
import Text from 'components/Text';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

const dataSource = [
  {
    key: 'media',
    before: 'bullhorn?',
    after: 'phonebooth'
  },
  {
    key: 'explanation',
    before: `The march itself faced a large amount of critisism for not having a clear established goal. This in itself makes parsing a media theory quote difficult as it was attempting to do a fair amount of disparate things.`,
    after: `After the march, there was a tactical shift within the march for science organization focusing on reaching out to representatives and advocating for science-based policy at the local level. On all social media platforms the organizers gave ways for followers to contact sentators and respresentatives. This was especially easy on facebook, which provided a widget that shows a user's local senators and asks if they want to contact them.`
  }
];

const columns = [
  {
    title: 'Before March',
    dataIndex: 'before',
    key: 'before'
  },
  {
    title: 'After March',
    dataIndex: 'after',
    key: 'after'
  }
];

const Home = () =>
  <PaddedLayout>
    <Flex column>
      <Question size="gigantic">
        Did the March for Science have the necessary network internalities in
        place to effectively enact change following the day of protest?
      </Question>
      <TopPaddedText margin={20}>
        In her book <i>Twitter and Tear Gas</i>, Tufekci discusses the effects
        of social media on the organization and durability of social movements.
        One of her central claims is that while social media has made it
        incredbily easy to rally a large group of people around a movement, the
        lack of "tedious work performed in the pre-internet era" has left many
        movements unacclimatized to the process of collective decision making
        which is crucial to the health and longevity of such a movement. In this
        project my goal was to discover whether the necessary network
        internalities existed in the March for Science movement, and to what
        extent was .... <b>This is where my thesis statement will go.</b>
      </TopPaddedText>
      <SubHeader>Media Theory</SubHeader>
      <Text>
        The movement seemed to have two distinct media theories corresponding to
        before and after the main march took place. I had a very hard time
        coming up with the media theory for the pre-march movement, as the
        organization itself did not seem to have a great understanding of
        exactly what it wanted. The post-march theory, however, was more clear
        as it corresponded to a clear tactical shift from within the movement.
      </Text>
      <MediaTheoryTable
        dataSource={dataSource}
        columns={columns}
        pargination={false}
      />
    </Flex>
  </PaddedLayout>;

const SubHeader = styled.h3`margin: 20px 0;`;

const MediaTheoryTable = styled(Table)`
  margin-top: 20px;

  .ant-table-tbody > tr, .ant-table-thead > tr {
    display: flex;
  }

  .ant-table-tbody > tr > td, .ant-table-thead > tr > th {
    flex: 1;
    word-break: normal;
  }
`;

const Question = styled(Text)`
  border-left: 5px solid gray;
  padding-left: 25px;
`;

const TopPaddedText = styled(Text)`
  ${({ margin }) => `margin-top: ${margin}px`};
  margin-top: 20px;
`;

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

export default Home;
