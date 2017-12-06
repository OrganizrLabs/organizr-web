// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Timeline as AntTimeline, Collapse } from 'antd';
import Layout from 'components/Layout';
import styled from 'styled-components';
import mfsIcon from 'assets/mfs_icon.png';
import MediaStore from 'stores/Media';
import UiStore from 'stores/UiStore';
import ImageLink from './components/ImageLink';

const Panel = Collapse.Panel;

type Props = {
  media: MediaStore,
  ui: UiStore
};

type ItemProps = {
  item: Object,
  ui: UiStore
};

const mapWithNewline = (text: string): React.Node =>
  text.split('\n').map(function(item, key) {
    return (
      <ListItem key={key}>
        {item.substring(2)}
      </ListItem>
    );
  });

const TimelineItem = inject('ui')(
  observer(
    ({
      item: { datetime, title, image, link, description, notes },
      ui,
      ...props
    }: ItemProps) =>
      <AntTimeline.Item dot={<MFSIcon src={mfsIcon} />} {...props}>
        {datetime &&
          <h3>
            {datetime}
          </h3>}
        <StyledCollapse defaultActiveKey={['1']}>
          <StyledPanel mobile={ui.isMobile} header={title}>
            <ImageLink imageUrl={image} link={link} />
            <PaddedFlex column auto p={1}>
              {description}
              {notes &&
                notes.length > 0 &&
                <UnorderedList>
                  {mapWithNewline(notes)}
                </UnorderedList>}
            </PaddedFlex>
          </StyledPanel>
        </StyledCollapse>
      </AntTimeline.Item>
  )
);

@observer
class Timeline extends React.Component<Props> {
  render() {
    const { media } = this.props;
    return (
      <Layout>
        <Flex column auto>
          <Header>Movement's Timeline</Header>
          <StyledTimeline pending={<h3>What's next?</h3>}>
            {media.timelineItems.map((item, i) =>
              <TimelineItem item={item} key={i} />
            )}
          </StyledTimeline>
        </Flex>
      </Layout>
    );
  }
}

const StyledPanel = styled(Panel)`
  .ant-collapse-content-box {
    display: flex;
    ${({ mobile }) => (mobile ? `flex-direction: column;` : `height: 200px;`)}
  }
`;

const ListItem = styled.li`
  list-style-type: disc;
  margin-left: 20px;
`;

const UnorderedList = styled.ul`margin-top: 5px;`;

const MFSIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const Header = styled.h1`
  margin: 10px 30px;
  margin-bottom: 0;
  padding-bottom: 5px;
`;

const PaddedFlex = styled(Flex)`
  font-size: 16px;
  overflow-y: scroll;
`;

const StyledTimeline = styled(AntTimeline)`
  margin: 30px;
`;

const StyledCollapse = styled(Collapse)`
  margin-top: 8px;
  .ant-collapse-content {
    padding: 0;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
    display: flex;
  }
`;

export { Timeline };
export default inject('media', 'ui')(Timeline);
