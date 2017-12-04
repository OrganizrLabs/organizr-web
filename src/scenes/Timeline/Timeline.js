// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Timeline as AntTimeline, Collapse, Icon } from 'antd';
import Layout from 'components/Layout';
import styled from 'styled-components';
import mfsIcon from 'assets/mfs_icon.png';
import MediaStore from 'stores/Media';
import UiStore from 'stores/UiStore';

const Panel = Collapse.Panel;

type Props = {
  media: MediaStore,
  ui: UiStore
};

type ItemProps = {
  time: string,
  title: string,
  link?: React.Node,
  image?: React.Node,
  children: React.Node,
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

const Link = ({ url }) => {
  const goToUrl = () => (window.location = url);
  return (
    <LinkContainer justify="center" align="center">
      <Icon type="link" onClick={goToUrl} style={{ fontSize: '18px' }} />
    </LinkContainer>
  );
};

const TimelineItem = ({
  time,
  title,
  link,
  image,
  children,
  ui,
  ...props
}: ItemProps) =>
  <AntTimeline.Item dot={<MFSIcon src={mfsIcon} />} {...props}>
    {time &&
      <h3>
        {time}
      </h3>}
    <StyledCollapse defaultActiveKey={['1']}>
      <StyledPanel mobile={ui.isMobile} header={title}>
        {image ? image : link}
        <PaddedFlex column p={1}>
          {children}
        </PaddedFlex>
      </StyledPanel>
    </StyledCollapse>
  </AntTimeline.Item>;

@observer
class Timeline extends React.Component<Props> {
  render() {
    const { media, ui } = this.props;
    return (
      <Layout>
        <Flex column auto>
          <Header>Movement's Timeline</Header>
          <StyledTimeline pending={<h3>To be continued...</h3>}>
            {media.timelineItems.map(
              ({ datetime, title, image, link, description, notes }, i) =>
                <TimelineItem
                  ui={ui}
                  time={datetime}
                  title={title}
                  image={
                    image &&
                    <TimelineImage src={image} mobile={ui.isMobile} alt="Alt" />
                  }
                  link={link && <Link url={link} />}
                  key={i}
                >
                  {description}
                  {notes &&
                    notes.length > 0 &&
                    <UnorderedList>
                      {mapWithNewline(notes)}
                    </UnorderedList>}
                </TimelineItem>
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
    ${({ mobile }) => mobile && `flex-direction: column;`}
  }
`;

const ListItem = styled.li`
  list-style-type: disc;
  margin-left: 20px;
`;

const TimelineImage = styled.img`
  ${({ mobile }) => (mobile ? `width: 100%;` : `height: 200px;`)};
`;

const LinkContainer = styled(Flex)`
  width: 50px;
  height: 50px;
  border-right: 1px solid #d9d9d9;
  cursor: pointer;
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
