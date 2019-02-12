// @flow

import {AsyncStorage} from 'react-native';

import basicCourse from '../../__fixtures__/discipline-bundle/basic';
import onboardingCourse from '../../__fixtures__/onboarding-course';
import {fakeError} from '../../utils/tests';
import type {Discipline} from './_types';
import {CONTENT_TYPE} from './_const';
import {
  buildKeyValuePair,
  normalizeDisciplineBundle,
  createReduceToNormalizedItemFunction,
  buildKey,
  getItem,
  getItemsPerResourceType,
  filterKeys,
  storeDisciplineBundle,
  fetchDisciplineBundle,
  buildLevels,
  mapToResourceType
} from './core';

const disciplineBundle = basicCourse;
const {disciplines, chapters, slides, exitNodes} = disciplineBundle;

describe('Data Layer Core', () => {
  it('should build the key/value pair', () => {
    const expectedResult = [
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)]
    ];

    // $FlowFixMe union type
    const result = buildKeyValuePair(CONTENT_TYPE.CHAPTER, 'en', chapters);
    expect(result).toEqual(expectedResult);
  });

  it('should a chunk of a storable chapters', () => {
    const result = createReduceToNormalizedItemFunction(disciplineBundle, 'en')([], 'chapters');
    const expectedResult = [
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)]
    ];

    expect(result).toEqual(expectedResult);
  });

  it('should a chunk of a storable chapters', () => {
    const bundledResourceWithoutDiscipline = {
      ...disciplineBundle,
      disciplines: {}
    };

    const result = createReduceToNormalizedItemFunction(bundledResourceWithoutDiscipline, 'en')(
      [],
      'disciplines'
    );

    const expectedResult = [];

    expect(result).toEqual(expectedResult);
  });

  it('should build for all resources included in the bundle -- with modules', () => {
    const expectedResult = [
      ['discipline:en:dis_1', JSON.stringify(disciplines.dis_1)],
      ['level:en:mod_1', JSON.stringify(disciplines.dis_1.modules[0])],
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)],
      ['slide:en:sli_1', JSON.stringify(slides.sli_1)],
      ['slide:en:sli_2', JSON.stringify(slides.sli_2)],
      ['slide:en:sli_3', JSON.stringify(slides.sli_3)],
      ['slide:en:sli_4', JSON.stringify(slides.sli_4)],
      ['exitNode:en:failExitNode', JSON.stringify(exitNodes.failExitNode)],
      ['exitNode:en:successExitNode', JSON.stringify(exitNodes.successExitNode)]
    ];

    const result = normalizeDisciplineBundle(disciplineBundle, 'en');

    expect(result).toEqual(expectedResult);
  });

  it('should build for all resources included in the bundle -- without modules', () => {
    const disciplineBundleWithoutModules = {
      ...disciplineBundle,
      disciplines: {
        dis_1: {
          ...disciplines.dis_1,
          modules: []
        }
      }
    };

    const expectedResult = [
      ['discipline:en:dis_1', JSON.stringify(disciplineBundleWithoutModules.disciplines.dis_1)],
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)],
      ['slide:en:sli_1', JSON.stringify(slides.sli_1)],
      ['slide:en:sli_2', JSON.stringify(slides.sli_2)],
      ['slide:en:sli_3', JSON.stringify(slides.sli_3)],
      ['slide:en:sli_4', JSON.stringify(slides.sli_4)],
      ['exitNode:en:failExitNode', JSON.stringify(exitNodes.failExitNode)],
      ['exitNode:en:successExitNode', JSON.stringify(exitNodes.successExitNode)]
    ];

    const result = normalizeDisciplineBundle(disciplineBundleWithoutModules, 'en');

    expect(result).toEqual(expectedResult);
  });

  it('should build for all resources included in the bundle -- without discipline', () => {
    // basically this case should never happend in a real business case situation
    const disciplineBundleWithoutModules = {
      ...disciplineBundle,
      disciplines: {}
    };

    const expectedResult = [
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)],
      ['slide:en:sli_1', JSON.stringify(slides.sli_1)],
      ['slide:en:sli_2', JSON.stringify(slides.sli_2)],
      ['slide:en:sli_3', JSON.stringify(slides.sli_3)],
      ['slide:en:sli_4', JSON.stringify(slides.sli_4)],
      ['exitNode:en:failExitNode', JSON.stringify(exitNodes.failExitNode)],
      ['exitNode:en:successExitNode', JSON.stringify(exitNodes.successExitNode)]
    ];

    const result = normalizeDisciplineBundle(disciplineBundleWithoutModules, 'en');

    expect(result).toEqual(expectedResult);
  });

  it('should build the key', () => {
    const resourceType = CONTENT_TYPE.DISCIPLINE;
    const userLanguage = 'en';
    const resourceReference = 'cha_1';

    const expectedResult = `${resourceType}:${userLanguage}:${resourceReference}`;
    expect(buildKey(resourceType, userLanguage, resourceReference)).toBe(expectedResult);
  });

  describe('getItem', () => {
    const resourceType = CONTENT_TYPE.DISCIPLINE;
    const userLanguage = 'en';
    const resourceReference = 'cha_1';

    it('should build the too', () => {
      AsyncStorage.getItem = jest
        .fn()
        .mockImplementation(() => Promise.resolve(JSON.stringify(disciplines.dis_1)));

      const result = getItem(resourceType, resourceReference, userLanguage);
      expect(result).resolves.toBe(disciplines.dis_1);
    });

    it('should not build the too', () => {
      AsyncStorage.getItem = jest.fn().mockImplementation(() => Promise.reject(fakeError));

      const result = getItem(resourceType, resourceReference, userLanguage);
      expect(result).rejects.toThrow('resource not found with cha_1');
    });
  });

  it('should filtred the given array item according to a regex', () => {
    const valueToRetrive = 'chapter:fr:cha_1';
    const keys = ['chapter:en:cha_1', 'discipline:fr:cha_1', valueToRetrive];
    const regex = new RegExp('^chapter:fr:(.+)+', 'gm');
    const result = filterKeys(regex, keys);
    expect(result).toEqual([valueToRetrive]);
  });

  it('should return all the stored resources according to the language and the resourceType', async () => {
    const resources = [
      ['chapter:en:cha_1', JSON.stringify(chapters.cha_1)],
      ['chapter:en:cha_2', JSON.stringify(chapters.cha_2)]
    ];

    AsyncStorage.getAllKeys = jest
      .fn()
      .mockImplementation(() => Promise.resolve(['chapter:en:cha_1', 'chapter:en:cha_2']));

    AsyncStorage.multiGet = jest.fn().mockImplementation(() => Promise.resolve(resources));

    const result = await getItemsPerResourceType(CONTENT_TYPE.CHAPTER, 'en');

    expect(result).toEqual([chapters.cha_1, chapters.cha_2]);
  });

  it('should build the levels', () => {
    // $FlowFixMe bundleResource.discipline is not mixed
    const arrayDisciplines: Array<Discipline> = Object.values(disciplines);
    const discipline: Discipline = arrayDisciplines[0];

    const result: Array<Array<string>> = buildLevels(discipline.modules, 'en');

    const expectedResult = [['level:en:mod_1', JSON.stringify(disciplines.dis_1.modules[0])]];
    expect(result).toEqual(expectedResult);
  });

  it('should transform a levels to a resourceType', () => {
    const rawResourcesType = 'levels';
    const expectedResult = CONTENT_TYPE.LEVEL;
    const result = mapToResourceType(rawResourcesType);
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if a value is not mappable to a resource type ', () => {
    const rawValue = 'toto';
    const dummyFunction = () => mapToResourceType(rawValue);
    expect(dummyFunction).toThrow(new Error('current type toto not supported'));
  });

  describe('storeDisciplineBundle', () => {
    it('should store the discipline bundle', async () => {
      AsyncStorage.multiSet = jest.fn().mockImplementation(() => Promise.resolve());
      const result = await storeDisciplineBundle(disciplineBundle, 'fr');
      expect(result).toBeUndefined();
    });

    it('should not store the discipline bundle', () => {
      AsyncStorage.multiSet = jest.fn().mockImplementation(() => Promise.reject(fakeError));
      const result = storeDisciplineBundle(disciplineBundle, 'fr');
      expect(result).rejects.toThrow(new Error('could not store the provided bundledResource'));
    });
  });

  describe('fetchDisciplineBundle', () => {
    AsyncStorage.multiSet = jest.fn().mockImplementation(() => Promise.resolve());

    it('should fetch basic', () => {
      const result = fetchDisciplineBundle('fixtures_basic', 'fr');
      // @todo should be mocked
      expect(result).resolves.toBe(disciplineBundle);
    });

    it('should fetch onboarding', () => {
      const result = fetchDisciplineBundle('fixtures_onboarding', 'fr');
      // @todo should be mocked
      expect(result).resolves.toBe(onboardingCourse);
    });

    it('should trigger error', () => {
      const result = fetchDisciplineBundle('foobarbaz', 'fr');
      expect(result).rejects.toThrow(new Error('API fetching not supported yet.'));
    });
  });
});
