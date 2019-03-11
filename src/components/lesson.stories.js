// @flow

import * as React from 'react';
import {storiesOf} from '@storybook/react-native';

import {createVideo, createPdf} from '../__fixtures__/lessons';
import {TestContextProvider, handleFakePress, fakeLayout} from '../utils/tests';
import type {Resource} from '../types';
import {reduceToResources} from '../layer/data/mappers';
import {Component as Lesson} from './lesson';

const video = createVideo({ref: 'les_1', description: 'Foo bar baz - Video'});
const pdf = createPdf({ref: 'les_2', description: 'Foo bar baz - PDF'});
const videoSubtitles = createVideo({
  ref: 'les_3',
  description: 'Foo bar baz - Video subtitles',
  subtitleRef: 'foobarbaz'
});
const lessons = [video, videoSubtitles, pdf];
const resources: Array<Resource> = reduceToResources(lessons);

storiesOf('Lesson', module)
  .add('Default', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={resources}
        onChange={handleFakePress}
        starsGranted={4}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Video selected', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={resources}
        selected={video._id}
        onChange={handleFakePress}
        starsGranted={4}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Video subtitles', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={resources}
        selected={videoSubtitles._id}
        onChange={handleFakePress}
        starsGranted={4}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('PDF selected', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={resources}
        selected={pdf._id}
        onChange={handleFakePress}
        starsGranted={4}
        layout={fakeLayout}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ))
  .add('Without layout', () => (
    <TestContextProvider>
      <Lesson
        header="What was the nationality of Steve Jobs?"
        resources={resources}
        onChange={handleFakePress}
        starsGranted={4}
        onPDFButtonPress={handleFakePress}
      />
    </TestContextProvider>
  ));
