// @flow strict

import type {Brand, ProgressionEngineVersions} from '../types';

export const createBrand = ({
  progressionEngine,
  host
}: {
  progressionEngine?: ProgressionEngineVersions,
  host?: string
} = {}): Brand => ({
  name: 'mobile',
  host: host || 'https://mobile-staging.coorpacademy.com',
  contentCategoryName: 'Mobile',
  colors: {
    primary: '#00B0FF'
  },
  hero: 'https://static.coorpacademy.com/content/mobile/raw/coorp_logo_infinite-1552063832916.png',
  images: {
    'logo-mobile':
      'https://static.coorpacademy.com/content/mobile/raw/coorp_logo_infinite-1552063832916.png'
  },
  progressionEngine: progressionEngine || {
    versions: {
      learner: '2',
      microlearning: '2'
    }
  }
});
