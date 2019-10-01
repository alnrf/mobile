// @flow

import type {Action, Progression} from '@coorpacademy/progression-engine';
import moment from 'moment';
import {CONTENT_TYPE} from '../const';

export const OLDEST_DATE = new Date('1971').toISOString();

export const isSuccess = (progression: Progression) => {
  if (!progression.state) return false;
  const {nextContent} = progression.state;
  return nextContent.type === CONTENT_TYPE.SUCCESS;
};

export const isFailure = (progression: Progression) => {
  if (!progression.state) return false;
  const {nextContent} = progression.state;
  return nextContent.type === CONTENT_TYPE.FAILURE;
};

export const isDone = (progression: Progression) => {
  return isFailure(progression) || isSuccess(progression);
};

export const getUpdatedAt = (actions: Array<Action> | void) => {
  if (!actions || actions.length === 0) {
    return OLDEST_DATE;
  }
  return actions.reduce((oldestDate, action) => {
    return moment(action.createdAt).isAfter(oldestDate) ? action.createdAt : oldestDate;
  }, OLDEST_DATE);
};

export const getCreatedAt = (actions: Array<Action> | void) => {
  if (!actions || actions.length === 0) {
    return OLDEST_DATE;
  }
  return actions.reduce((oldestDate, action) => {
    return moment(action.createdAt).isBefore(oldestDate) ? action.createdAt : oldestDate;
  }, new Date());
};

export const sortProgressionChronologicaly = (
  progressions: Array<Progression>
): Array<Progression> =>
  progressions.sort((a: Progression, b: Progression) => {
    const aCreatedAt = getCreatedAt(a.actions);
    const bCreatedAt = getCreatedAt(b.actions);
    return moment(aCreatedAt).isBefore(bCreatedAt) ? -1 : 1;
  });
