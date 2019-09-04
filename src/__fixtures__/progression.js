// @flow
import type {GenericContent, Progression, State} from '@coorpacademy/progression-engine';
import type {Engine} from '../types';

export type StateExtension = $Shape<State>;

export const createState = (state: StateExtension | void): State => {
  const {
    livesDisabled = false,
    isCorrect = true,
    slides = [],
    lives = 4,
    step = {
      current: 1
    },
    stars = 0,
    requestedClues = [],
    viewedResources = [],
    remainingLifeRequests = 1,
    hasViewedAResourceAtThisStep = false,
    content = {type: 'slide', ref: 'sli_foo'},
    nextContent = {type: 'slide', ref: 'sli_foo'},
    allAnswers = [],
    variables = {}
  } = state || {};

  const mergedState = {
    livesDisabled,
    isCorrect,
    slides,
    lives,
    step,
    stars,
    requestedClues,
    viewedResources,
    remainingLifeRequests,
    hasViewedAResourceAtThisStep,
    content,
    nextContent,
    allAnswers,
    variables
  };
  return mergedState;
};

export const createProgression = ({
  _id,
  engine,
  progressionContent,
  state
}: {
  _id?: string,
  engine: Engine,
  progressionContent: GenericContent,
  state?: StateExtension
}): Progression => {
  return {
    _id: _id || undefined,
    engine: {
      ref: engine,
      version: '2'
    },
    content: progressionContent,
    engineOptions: {
      version: '2'
    },
    actions: [
      {
        type: 'move',
        createdAt: new Date().toISOString(),
        payload: {
          instructions: null,
          nextContent: {
            type: 'slide',
            ref: 'sli_foo'
          }
        }
      }
    ],
    state: state ? createState(state) : undefined
  };
};

export default createProgression;
