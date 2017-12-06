import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import placeholder from 'assets/placeholder.png';

type Props = {
  imageUrl: string,
  link: string
};

type State = {
  linkVisible: boolean
};

class ImageLink extends React.Component<Props> {
  state: State;

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

  render() {
    const { imageUrl, link } = this.props;
    return (
      <ImageWrapper onMouseEnter={this.showLink} onMouseLeave={this.hideLink}>
        <BackgroundImage
          blurred={this.state.linkVisible}
          alt="example"
          width="100%"
          src={imageUrl || placeholder}
        />
        {this.state.linkVisible &&
          <LinkWrapper href={link} target="_blank">
            <LinkIcon type="link" />
          </LinkWrapper>}
      </ImageWrapper>
    );
  }
}

const ImageWrapper = styled.div`
  display: block;
  position: relative;
  height: 120px;
  overflow: hidden;
`;

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

const LinkWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
`;

export default ImageLink;
