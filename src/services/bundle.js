// @flow strict

import {CONTENT_TYPE} from '../layer/data/_const';
import type {SupportedLanguage} from '../translations/_types';
import type {DataLayer} from '../layer/data';
import type {BundledDiscipline, BundledChapter} from '../layer/data/_types';

export type BundleService = {|
  findById: (
    type: typeof CONTENT_TYPE.DISCIPLINE | typeof CONTENT_TYPE.CHAPTER,
    ref: string,
    userLanguage: SupportedLanguage,
    token: string,
    host: string
  ) => Promise<BundledDiscipline | BundledChapter>,
  // @todo change for setXXX
  store: (
    bundledResource: BundledDiscipline | BundledChapter,
    userLanguage: SupportedLanguage
  ) => Promise<void>
|};

const service = (dataLayer: DataLayer): BundleService => ({
  findById: dataLayer.fetchBundle,
  store: dataLayer.storeBundle
});

export default service;
