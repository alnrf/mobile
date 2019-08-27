// @flow

import * as React from 'react';
import renderer from 'react-test-renderer';

import {ANALYTICS_EVENT_TYPE, CARD_TYPE, RESOURCE_TYPE} from '../const';
import {createFakeAnalytics} from '../utils/tests';
import type {Card} from '../components/cards';
import {Component as CardsSwipable} from './cards-swipable';

describe('CardsSwipable', () => {
  it('should handle onSwipe on resource card and forward analytics data', () => {
    const dummyResourceCard: Card = {
      type: CARD_TYPE.RESOURCE,
      title: 'correction',
      isCorrect: true,
      resource: {
        description: '',
        videoId: 'KovTu3zU',
        mediaRef: 'med_jwp_Vy4JQKFhN',
        mimeType: 'application/jwplayer',
        ref: 'plop',
        _id: 'plop',
        type: RESOURCE_TYPE.VIDEO,
        subtitles: [],
        posters: [],
        src: [],
        poster: '',
        url: ''
      },
      offeringExtraLife: false
    };
    const renderItem = jest.fn();
    const selectResource = jest.fn();
    const analytics = createFakeAnalytics();

    const component = renderer.create(
      <CardsSwipable
        analytics={analytics}
        items={[dummyResourceCard]}
        renderItem={renderItem}
        selectResource={selectResource}
      />
    );

    expect(selectResource).toHaveBeenCalledWith('plop');

    const cards = component.root.find(el => el.props.testID === 'cards');
    cards.props.onSwiped(0);

    expect(analytics.logEvent).toHaveBeenCalledWith(ANALYTICS_EVENT_TYPE.SWIPE, {
      id: 'deck-card',
      isCorrect: 1,
      offeringExtraLife: 0,
      ref: 'plop',
      type: 'resource-video'
    });
  });

  it('should handle onSwipe on tip card card and forward analytics data', () => {
    const dummyResourceCard: Card = {
      type: CARD_TYPE.RESOURCE,
      title: 'correction',
      isCorrect: true,
      resource: {
        description: '',
        videoId: 'KovTu3zU',
        mediaRef: 'med_jwp_Vy4JQKFhN',
        mimeType: 'application/jwplayer',
        ref: 'plop',
        _id: 'plop',
        type: RESOURCE_TYPE.VIDEO,
        subtitles: [],
        posters: [],
        src: [],
        poster: '',
        url: ''
      },
      offeringExtraLife: false
    };

    const dummyTipCard: Card = {
      type: CARD_TYPE.TIP,
      title: 'fooz',
      isCorrect: false
    };

    const renderItem = jest.fn();
    const selectResource = jest.fn();
    const analytics = createFakeAnalytics();

    const component = renderer.create(
      <CardsSwipable
        analytics={analytics}
        items={[dummyTipCard, dummyResourceCard]}
        renderItem={renderItem}
        selectResource={selectResource}
      />
    );

    expect(selectResource).not.toHaveBeenCalled();

    const cards = component.root.find(el => el.props.testID === 'cards');
    cards.props.onSwiped(0);

    expect(selectResource).toHaveBeenCalledWith('plop');
    expect(analytics.logEvent).toHaveBeenCalledWith(ANALYTICS_EVENT_TYPE.SWIPE, {
      id: 'deck-card',
      isCorrect: 0,
      type: CARD_TYPE.TIP
    });
  });
});
