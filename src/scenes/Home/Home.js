import * as React from 'react';
import { Card } from 'antd';
import Layout from 'components/Layout';
import { inject, observer } from 'mobx-react';
import Text from 'components/Text';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import oped from 'assets/oped.jpg';

type Props = {
  ui: UiStore
};

const Home = ({ ui }: Props) =>
  <PaddedLayout>
    <Flex column>
      <Question size={ui.isMobile ? 'large' : 'gigantic'}>
        Was the March for Science movement able to perform the necessary
        tactical innovations to maintain momentum following the Earth Day march?
      </Question>
      <TopPaddedText margin={20}>
        In her book <i>Twitter and Tear Gas</i>, Tufekci discusses the effects
        of social media on the organization and durability of social movements.
        One of her central claims is that while social media has made it
        incredibly easy to rally a large group of people around a movement, the
        lack of "tedious work performed in the pre-internet era" has left many
        movements unacclimatized to the process of collective decision making
        which is crucial to the health and longevity of such a movement. In this
        project my goal was to discover how my movement handled the transition
        from the initial march to surviving afterwards despite completing the
        march it set out to do.{' '}
        <b>
          From my research, I conclude that while the transition after the march
          and avoidance of tactical freeze started strong, internal divisions
          arising from weak network internalities and a stagnant use of social
          media limited the disruptive capacity of the movement after the march.
        </b>
      </TopPaddedText>
      <SubHeader>
        Media Theory: <b>An Op Ed Piece</b>
      </SubHeader>

      <Card bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <MediaTheoryImage alt="Op Ed" width="100%" src={oped} />
        </div>
        <CardBody column>
          <CardTitle>Op-Ed Piece</CardTitle>
          <Text>
            I had trouble constructing a media theory as there were two main
            aspects of their social media: one focused on commenting on
            political events and raising awareness about the political climate,
            even sometimes calling on followers to contact their
            representatives. This aspect I thought was similar to an op-ed piece
            - the organizers were providing their opinions on the news in a
            political manner. The second aspect was a more general attempt to
            promote science awareness through posts about scientific
            breakthroughs or the birthdays of famous scientists. These posts
            portrayed the social media as more of a general science newspaper or
            magazine. Ultimately I think the op-ed piece captures the main use
            of the media, while the general science posts detracted from the the
            media’s utility.
          </Text>
        </CardBody>
      </Card>
    </Flex>
  </PaddedLayout>;

const MediaTheoryImage = styled.img`
  filter: sepia(20%);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border: 1px solid gray;
`;

const CardTitle = styled.h2`margin-bottom: 10px;`;

const CardBody = styled(Flex)`
  padding: 15px;
  padding-top: 5px;
`;

const SubHeader = styled.h3`margin: 20px 0;`;

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

export default inject('ui')(observer(Home));
