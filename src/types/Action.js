// @flow

export type Action = {
  type: string,
  payload: Object,
  error: ?boolean,
  meta: any
};
