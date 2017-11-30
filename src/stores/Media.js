// @flow
import { observable, computed, action } from 'mobx';
import { type Media as MediaType } from 'types/Media';

class Media {
  client: Object;
  @observable media: Array<MediaType> = [];
  @observable
  types: Array<string> = [
    'all',
    'article',
    'post',
    'image',
    'book',
    'website',
    'other'
  ];

  @computed
  get tags(): Map<string, number> {
    let tags = new Map();
    for (let item of this.media) {
      if (item.tags) {
        for (let tag of item.tags) {
          tags.set(tag, tags.get(tag) + 1 || 1);
        }
      }
    }
    return tags || [];
  }

  @computed
  get timelineItems(): MediaType {
    return this.media.filter(item => !!item.datetime).map(item => ({
      ...item,
      datetime: new Date(item.datetime).toDateString()
    }));
  }

  @action
  getMediaEntries = async (): Promise<*> => {
    try {
      const res = await this.client
        .getEntries({
          content_type: 'media'
        })
        .then(response => response.items);
      if (res) {
        console.log(res);
        this.media = res.map(item => ({
          id: item.sys.id,
          ...item.fields,
          image: item.fields.image
            ? item.fields.image.fields.file.url
            : undefined
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  constructor(client: Object) {
    this.client = client;
  }
}

export default Media;
