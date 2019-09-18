// @flow
import type {Progression, GenericContent, State, Action} from '@coorpacademy/progression-engine';
import type {ProgressionAPI} from '../layer/data/_types';
import type {Engine} from '../types';

export type StateExtension = $Shape<State>;

export const createAction = ({createdAt}: {createdAt?: string}): Action => {
  return {
    type: 'move',
    createdAt: createdAt || undefined,
    payload: {
      instructions: null,
      nextContent: {
        type: 'slide',
        ref: 'sli_foo'
      }
    }
  };
};

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
  state,
  actions
}: {
  _id?: string,
  engine: Engine,
  progressionContent: GenericContent,
  state?: StateExtension,
  actions?: Array<Action>
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
    actions: actions ? actions : [],
    state: state ? createState(state) : undefined
  };
};

export const createProgressionAPI = ({
  _id,
  engine,
  progressionContent,
  state,
  meta
}: {
  _id: string,
  engine: Engine,
  progressionContent: GenericContent,
  state?: StateExtension,
  meta?: {updatedAt: string, createdAt: string}
}): ProgressionAPI => {
  const progression = createProgression({
    _id,
    engine,
    progressionContent,
    state
  });

  return {
    ...progression,
    meta: meta || {
      createdAt: '2019-09-18T12:05:22.981Z',
      updatedAt: '2019-09-18T12:05:22.981Z'
    }
  };
};

export default createProgression;
