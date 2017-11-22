import * as React from 'react';
import { Modal, Tag } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  item: Object,
  onClose: Function
};

const mapWithNewline = (text: string): React.Node =>
  text.split('\n').map(function(item, key) {
    return (
      <ListItem key={key}>
        {item.substring(2)}
      </ListItem>
    );
  });

class ItemModal extends React.Component<Props> {
  render() {
    const { item, onClose } = this.props;
    return (
      <Modal
        title={item.title}
        visible
        footer={null}
        onOk={onClose}
        onCancel={onClose}
      >
        {item.image &&
          <ImageWrapper>
            <ModalImage src={item.image} alt="Media Item" />
            <Tags align="center">
              {item.tags.map((tag, i) =>
                <Tag key={i}>
                  {tag}
                </Tag>
              )}
            </Tags>
          </ImageWrapper>}
        {item.description}
        {item.notes &&
          item.notes.length > 0 &&
          <UnorderedList>
            {mapWithNewline(item.notes)}
          </UnorderedList>}
      </Modal>
    );
  }
}

const UnorderedList = styled.ul`margin-top: 5px;`;

const ListItem = styled.li`
  list-style-type: disc;
  margin-left: 15px;
`;

const Tags = styled(Flex)`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  height: 32px;
  padding: 0 10px;
  background: rgba(100, 100, 100, 0.6);
`;

const ImageWrapper = styled.div`position: relative;`;

const ModalImage = styled.img`width: 100%;`;

export default ItemModal;
