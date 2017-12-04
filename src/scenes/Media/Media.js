// @flow
import * as React from 'react';
import MediaStore from './MediaStore';
import UiStore from 'stores/UiStore';
import { inject, observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import styled from 'styled-components';
import GlobalMedia from 'stores/Media';
import { Select, Input, Tag, Spin } from 'antd';

// Local components
import MediaItem from './components/MediaItem';
import ItemModal from './components/ItemModal';

const Search = Input.Search;
const Option = Select.Option;
const { CheckableTag } = Tag;

type Props = {
  client: Object,
  media: GlobalMedia,
  ui: UiStore
};

@observer
class Media extends React.Component<Props> {
  store: MediaStore;

  constructor(props: Props) {
    super(props);
    this.store = new MediaStore();
  }

  filterFromTags = (item: Object) => {
    if (this.store.tagFilters.length === 0) return true;
    if (!item.tags) return false;
    for (let tag of this.store.tagFilters) {
      if (item.tags.includes(tag)) return true;
    }
    return false;
  };

  filterFromType = (item: Object) =>
    item.type === this.store.typeSelection ||
    this.store.typeSelection === 'all';

  renderContent = () => {
    const { media } = this.props;
    if (media.media.length === 0) {
      return (
        <LoadingWrapper auto justify="center" align="center">
          <Spin size="large" />
        </LoadingWrapper>
      );
    }
    return (
      <WrappedFlex>
        {media.media
          .filter(
            item => this.filterFromTags(item) && this.filterFromType(item)
          )
          .map((item, i) => {
            const openDetail = () => this.store.showModal(item.id);
            return <StyledMediaItem key={i} item={item} onClick={openDetail} />;
          })}
      </WrappedFlex>
    );
  };

  render() {
    const { media, ui } = this.props;
    const activeItem =
      media.media.find(item => item.id === this.store.activeMediaId) || {};
    return (
      <Layout>
        <Flex column auto>
          <HeaderWrapper column>
            <Header>Movement's Media</Header>
            <Flex>
              <Search placeholder="Filter Media" />
              <TypeSelect
                value={this.store.typeSelection}
                onSelect={this.store.changeType}
              >
                {media.types.map(type =>
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                )}
              </TypeSelect>
            </Flex>
            {!ui.isMobile &&
              <TagsWrapper>
                {[...media.tags.keys()].map((tag, i) => {
                  const handleTagChange = checked => {
                    if (checked) this.store.addTagFilter(tag);
                    else this.store.removeTagFilter(tag);
                  };
                  return (
                    <CheckableTag
                      checked={this.store.tagFilters.includes(tag)}
                      onChange={handleTagChange}
                    >
                      {tag}
                      <TagNumber>
                        {media.tags.get(tag)}
                      </TagNumber>
                    </CheckableTag>
                  );
                })}
              </TagsWrapper>}
          </HeaderWrapper>
          <ContentWrapper>
            {this.renderContent()}
          </ContentWrapper>
        </Flex>
        {this.store.modalVisible &&
          <ItemModal item={activeItem} onClose={this.store.hideModal} />}
      </Layout>
    );
  }
}

const WrappedFlex = styled(Flex)`
  flex-wrap: wrap;
`;

const TypeSelect = styled(Select)`
  width: 150px;
  margin-left: 10px;
`;

const TagNumber = styled.span`margin-left: 8px;`;

const TagsWrapper = styled(Flex)`
  margin-top: 8px;
  overflow: scroll;
`;

const StyledMediaItem = styled(MediaItem)`
  flex: 1 1 auto;
  flex-basis: 200px;
  margin: 15px;
  margin-top: 0;
`;

const ContentWrapper = styled(Flex)`
  margin: 15px;
`;

const Header = styled.h1`
  margin-bottom: 0;
  padding-bottom: 5px;
`;

const HeaderWrapper = styled(Flex)`
  margin: 10px 30px;
  margin-bottom: 0;
`;

const LoadingWrapper = styled(Flex)`
  min-height: 200px;
`;

export { Media };
export default inject('client', 'media', 'ui')(Media);
