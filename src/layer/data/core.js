// @flow strict

import {AsyncStorage} from 'react-native';

import disciplinesBundle from '../../__fixtures__/discipline-bundle';
import onboarding from '../../__fixtures__/__temporary__/onboarding-course';
import bescherelle from '../../__fixtures__/__temporary__/bescherelle-course';
import type {SupportedLanguage} from '../../translations/_types';
import type {BundledDiscipline, Resource, ResourceType, Level, Discipline} from './_types';
import {CONTENT_TYPE} from './_const';

export const buildKeyValuePair = (
  resourceType: ResourceType,
  userLanguage: SupportedLanguage,
  resource: {[key: string]: Resource}
): Array<Array<string>> => {
  const keys: Array<string> = Object.keys(resource);
  return keys.map(key => [`${resourceType}:${userLanguage}:${key}`, JSON.stringify(resource[key])]);
};

export const buildLevels = (
  levels: Array<Level>,
  userLanguage: SupportedLanguage
): Array<Array<string>> =>
  levels.map(item => [`${CONTENT_TYPE.LEVEL}:${userLanguage}:${item.ref}`, JSON.stringify(item)]);

export const mapToResourceType = (value: string): ResourceType => {
  switch (value) {
    case 'chapters':
      return CONTENT_TYPE.CHAPTER;

    case 'disciplines':
      return CONTENT_TYPE.DISCIPLINE;

    case 'exitNodes':
      return CONTENT_TYPE.EXIT_NODE;

    case 'slides':
      return CONTENT_TYPE.SLIDE;

    case 'chapterRules':
      return CONTENT_TYPE.CHAPTER_RULE;
    case 'levels':
      return CONTENT_TYPE.LEVEL;

    default:
      throw new Error(`current type ${value} not supported`);
  }
};

export const createReduceToNormalizedItemFunction = (
  bundledResource: BundledDiscipline,
  userLanguage: SupportedLanguage
) => (accumulator: Array<Array<string>>, currentValue: string): Array<Array<string>> => {
  let levels = [];
  if (currentValue === 'disciplines') {
    // $FlowFixMe bundleResource.discipline is not mixed
    const disciplines: Array<Discipline> = Object.values(bundledResource.disciplines);
    levels = buildLevels(
      disciplines.reduce((result, discipline) => result.concat(discipline.modules), []),
      userLanguage
    );
  }
  return accumulator.concat(
    buildKeyValuePair(
      mapToResourceType(currentValue),
      userLanguage,
      // $FlowFixMe
      bundledResource[currentValue]
    ),
    levels
  );
};

export const normalizeDisciplineBundle = (
  bundledResource: BundledDiscipline,
  userLanguage: SupportedLanguage
): Array<Array<string>> => {
  const keys: Array<string> = Object.keys(bundledResource);
  const result = keys.reduce(
    createReduceToNormalizedItemFunction(bundledResource, userLanguage),
    []
  );
  return result;
};

export const storeDisciplineBundle = async (
  bundledDiscipline: BundledDiscipline,
  userLanguage: SupportedLanguage
): Promise<void> => {
  const normalizedBundle = normalizeDisciplineBundle(bundledDiscipline, userLanguage);
  try {
    // eslint-disable-next-line no-console
    console.log('Storing:', normalizedBundle.map(item => item[0]));
    await AsyncStorage.multiSet(normalizedBundle);
  } catch (e) {
    throw new Error('could not store the provided bundledResource');
  }
};

export const fetchDisciplineBundle = (
  ref: string,
  userLanguage: SupportedLanguage
): Promise<BundledDiscipline> => {
  if (Object.keys(disciplinesBundle.disciplines).includes(ref)) {
    return Promise.resolve(disciplinesBundle);
  }

  if (Object.keys(onboarding.disciplines).includes(ref)) {
    return Promise.resolve(onboarding);
  }

  if (Object.keys(bescherelle.disciplines).includes(ref)) {
    return Promise.resolve(bescherelle);
  }

  // Implement fetching logic here
  return Promise.reject(new Error('API fetching not supported yet.'));
};

export const buildKey = (
  resourceType: ResourceType,
  userLanguage: SupportedLanguage,
  resourceReference: string
) => {
  return `${resourceType}:${userLanguage}:${resourceReference}`;
};

export const getItem = async (
  resourceType: ResourceType,
  resourceReference: string,
  userLanguage: SupportedLanguage
): Promise<Resource> => {
  const key = buildKey(resourceType, userLanguage, resourceReference);
  try {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item);
  } catch (e) {
    throw new Error(`resource not found with ${resourceReference}`);
  }
};

export const filterKeys = (regex: RegExp, keys: Array<string>): Array<string> =>
  keys.filter((key: string) => key.match(regex));

export const getItemsPerResourceType = async (
  resourceType: ResourceType,
  userLanguage: SupportedLanguage
) => {
  const allKeys = await AsyncStorage.getAllKeys();
  const regex = new RegExp(`^(${resourceType}:${userLanguage}:(.+)+)`, 'gm');
  const filtredKeys = filterKeys(regex, allKeys);
  const retrivedValues = await AsyncStorage.multiGet(filtredKeys);
  return retrivedValues.map(item => JSON.parse(item[1]));
};

export default {
  getItem,
  getItemsPerResourceType
};
