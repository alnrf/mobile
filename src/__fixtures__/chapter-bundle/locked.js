// @flow strict

import type {BundledChapter} from '../../layer/data/_types';
import {createChapter} from '../chapters';
import {createSlide} from '../slides';
import {createQCM} from '../questions';
import {failureExitNode, successExitNode} from '../exit-nodes';
import {image} from '../medias';

const accessible = false;
const qcm = createQCM({media: image});
const lessons = [];

const bundledChapter: BundledChapter = {
  chapters: {
    microlearning_locked_cha_1: createChapter({
      ref: 'microlearning_locked_cha_1',
      name: 'Microlearning locked: Locked chapter',
      accessible
    })
  },
  slides: {
    // group question type in a same chapter, because progression engine choose randomly one of it
    microlearning_locked_sli_1: createSlide({
      ref: 'microlearning_locked_sli_1',
      chapterId: 'microlearning_locked_cha_1',
      question: qcm,
      lessons
    }),
    microlearning_locked_sli_2: createSlide({
      ref: 'microlearning_locked_sli_2',
      chapterId: 'microlearning_locked_cha_1',
      question: qcm,
      lessons
    }),
    microlearning_locked_sli_3: createSlide({
      ref: 'microlearning_locked_sli_3',
      chapterId: 'microlearning_locked_cha_1',
      question: qcm,
      lessons
    }),
    microlearning_locked_sli_4: createSlide({
      ref: 'microlearning_locked_sli_4',
      chapterId: 'microlearning_locked_cha_1',
      question: qcm,
      lessons
    })
  },
  exitNodes: {
    [failureExitNode.ref]: failureExitNode,
    [successExitNode.ref]: successExitNode
  },
  chapterRules: {}
};

export default bundledChapter;
