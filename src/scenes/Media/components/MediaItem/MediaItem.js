import * as React from 'react';
import { Card, Icon } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { type Media } from 'types/Media';
import placeholder from 'assets/placeholder.png';

type Props = {
  item: Media,
  onClick: Function,
  className?: string
};

class MediaItem extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      linkVisible: false
    };
  }

  showLink = () => {
    this.setState({
      linkVisible: true
    });
  };

  hideLink = () => {
    this.setState({
      linkVisible: false
    });
  };

  goToLink = () => {
    window.location = this.props.item.link;
  };

  render() {
    const {
      item: { title, description, image },
      onClick,
      className
    } = this.props;
    return (
      <Card className={className} bodyStyle={{ padding: 0 }}>
        <ImageWrapper onMouseEnter={this.showLink} onMouseLeave={this.hideLink}>
          <BackgroundImage
            blurred={this.state.linkVisible}
            alt="example"
            width="100%"
            src={image || placeholder}
          />
          {this.state.linkVisible &&
            <LinkWrapper justify="center" align="center">
              <LinkIcon type="link" onClick={this.goToLink} />
            </LinkWrapper>}
        </ImageWrapper>
        <CardContent onClick={onClick}>
          <h3>
            {title}
          </h3>
          <p>
            {description}
          </p>
        </CardContent>
      </Card>
    );
  }
}

const LinkIcon = styled(Icon)`
  border-radius: 50%;
  padding: 5px;
  border: 2px solid #0f8ee9;
  font-size: 30px;
  color: #0f8ee9;
`;

const BackgroundImage = styled.img`
  border-bottom: 1px solid #eaeaea;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  ${({ blurred }) =>
    blurred &&
    `
    filter: blur(1px); 
    filter: grayscale(1);
  `};
`;

const LinkWrapper = styled(Flex)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
`;

const CardContent = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  p {
    margin-top: 5px;
    color: #999;
  }
`;

const ImageWrapper = styled.div`
  display: block;
  position: relative;
  height: 120px;
  overflow: hidden;
`;

export default MediaItem;
