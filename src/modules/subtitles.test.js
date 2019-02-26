// @flow strict

import {getSubtitlesUri} from './subtitles';

describe('Subtitles', () => {
  it('should return the URI from ref', () => {
    const result = getSubtitlesUri('https://sub.domain.tld/', 'foobarbaz');
    expect(result).toEqual('https://sub.domain.tld/api/v2/subtitles/foobarbaz/vtt');
  });
});
