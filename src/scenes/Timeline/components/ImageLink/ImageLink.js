import * as React from 'react';
import { Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';
import placeholder from 'assets/placeholder.png';

type Props = {
  imageUrl: string,
  link: string,
  ui: UiStore
};

type State = {
  linkVisible: boolean
};

@observer
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
    const { imageUrl, link, ui } = this.props;
    return (
      <ImageWrapper onMouseEnter={this.showLink} onMouseLeave={this.hideLink}>
        <BackgroundImage
          blurred={this.state.linkVisible}
          mobile={ui.isMobile}
          alt="example"
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
  ${({ mobile }) =>
    mobile ? `width: 100%;` : `height: 200px;`} margin-bottom: -5px;
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

export default inject('ui')(ImageLink);
