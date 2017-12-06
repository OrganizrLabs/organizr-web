import * as React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { type Media } from 'types/Media';
import ImageLink from '../ImageLink';

type Props = {
  item: Media,
  onClick: Function,
  className?: string
};

class MediaItem extends React.Component<Props> {
  render() {
    const {
      item: { title, description, image, link },
      onClick,
      className
    } = this.props;
    return (
      <Card className={className} bodyStyle={{ padding: 0 }}>
        <ImageLink imageUrl={image} link={link} />
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

const CardContent = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  p {
    margin-top: 5px;
    color: #999;
  }
`;

export default MediaItem;
