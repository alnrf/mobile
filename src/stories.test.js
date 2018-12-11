// @flow

import initStoryshots, {multiSnapshotWithOptions} from '@storybook/addon-storyshots';

initStoryshots({
  configPath: `${__dirname}/stories.js`,
  test: multiSnapshotWithOptions({})
});
