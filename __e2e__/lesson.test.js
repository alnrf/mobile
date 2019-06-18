// @flow strict

import {
  reloadApp,
  bypassAuthentication,
  getLessonTab,
  tapCardOnSection,
  waitForExist,
  waitForVisible,
  waitForNotVisible
} from './utils';

describe('Lesson', () => {
  beforeAll(async () => {
    await reloadApp();
    await bypassAuthentication();
  });

  describe('More than 1 resource', () => {
    it('should see catalog and choose a discipline', async () => {
      await waitForExist('catalog-section-recommended-item-basic-dis-1');
      await tapCardOnSection('catalog-section-recommended-items', 2);
    });

    it('should see lesson tab icon with notification', async () => {
      await weExpect(element(by.id('lesson-notification'))).toBeVisible();
    });

    it('should be redirected to lesson tab', async () => {
      await getLessonTab(element).tap();
      await waitForVisible('lesson-screen');
    });

    it('should see resources browser', async () => {
      await weExpect(element(by.id('resources-browser'))).toExist();
    });

    it('should see a stars note', async () => {
      await weExpect(element(by.id('additional-stars-note'))).toBeVisible();
    });

    it('should see the first resource selected', async () => {
      await weExpect(element(by.id('resource-les-1-selected'))).toBeVisible();
      await weExpect(element(by.id('resource-les-1-thumbnail'))).toBeVisible();
      await weExpect(element(by.id('resource-les-1-description'))).toBeVisible();
      await weExpect(element(by.id('resource-les-1-video-icon'))).toBeVisible();
    });

    describe('Video', () => {
      it('should see a video preview', async () => {
        await weExpect(element(by.id('preview-video-lesson-resource'))).toBeVisible();
        await weExpect(element(by.id('video'))).toBeNotVisible();
        await weExpect(element(by.id('video-replay-lesson-resource'))).toBeNotVisible();
      });

      it('should start the video', async () => {
        await element(by.id('preview-video-lesson-resource')).tap();
        await waitForVisible('video-container-lesson-resource');
        await weExpect(element(by.id('video-lesson-resource'))).toBeVisible();
        await weExpect(element(by.id('video-pause'))).toBeVisible();
        await weExpect(element(by.id('video-play'))).toBeNotVisible();
        await weExpect(element(by.id('video-seekbar'))).toBeVisible();
        await weExpect(element(by.id('video-timer'))).toBeVisible();
        await weExpect(element(by.id('video-fullscreen-expand'))).toBeVisible();
      });

      it('should display subtitles', async () => {
        await weExpect(element(by.id('video-CC-on'))).toBeVisible();
      });

      it('should hide subtitles', async () => {
        await element(by.id('video-CC-on')).tap();
        await weExpect(element(by.id('video-CC-off'))).toBeVisible();
      });

      it('should pause the video', async () => {
        await element(by.id('video-pause')).tap();
        await weExpect(element(by.id('video-play'))).toBeVisible();
        await weExpect(element(by.id('video-pause'))).toBeNotVisible();
      });

      it('should resume the video', async () => {
        await element(by.id('video-play')).tap();
        await weExpect(element(by.id('video-play'))).toBeNotVisible();
        await weExpect(element(by.id('video-pause'))).toBeVisible();
      });

      it('should fast forward the video', async () => {
        await element(by.id('video-seekbar-pin')).swipe('right');
        await waitForVisible('video-replay-lesson-resource');
      });

      it('should replay the video', async () => {
        await element(by.id('video-replay-lesson-resource')).tap();
        await weExpect(element(by.id('video-replay-lesson-resource'))).toBeNotVisible();
        await weExpect(element(by.id('video-lesson-resource'))).toBeVisible();
      });

      // This is not possible to test it with iOS native fullscreen

      // it('should expand the video', async () => {
      //   await element(by.id('video-fullscreen-expand')).tap();
      //   await waitFor(element(by.id('video-container-fullscreen'))).toBeVisible();
      //   await weExpect(element(by.id('video-container'))).toBeNotVisible();
      //   await weExpect(element(by.id('video-container-fullscreen'))).toBeVisible();
      //   await weExpect(element(by.id('video-fullscreen-shrink'))).toBeVisible();
      // });

      // it('should shrink the video', async () => {
      //   await element(by.id('video-fullscreen-shrink')).tap();
      //   await waitFor(element(by.id('video-container'))).toBeVisible();
      //   await weExpect(element(by.id('video-container'))).toBeVisible();
      //   await weExpect(element(by.id('video-container-fullscreen'))).toBeNotVisible();
      //   await weExpect(element(by.id('video-fullscreen-expand'))).toBeVisible();
      // });
    });

    describe('Browser', () => {
      it('should scroll to pdf resource', async () => {
        await element(by.id('resources')).swipe('up');
        await weExpect(element(by.id('resource-les-4'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-thumbnail'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-description'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-pdf-icon'))).toBeVisible();
      });

      it('should be able to select the pdf resource', async () => {
        await element(by.id('resource-les-4')).tap();
        await weExpect(element(by.id('resource-les-4-selected'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-thumbnail'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-description'))).toBeVisible();
        await weExpect(element(by.id('resource-les-4-pdf-icon'))).toBeVisible();
      });
    });

    describe('Pdf', () => {
      it('should see elements', async () => {
        await weExpect(element(by.id('preview-pdf-lesson-resource'))).toBeVisible();
        await weExpect(element(by.id('preview-pdf-icon'))).toBeVisible();
        await weExpect(element(by.id('button-open-pdf'))).toBeVisible();
      });

      it('should open the pdf', async () => {
        await element(by.id('button-open-pdf')).tap();
        await waitForVisible('pdf-screen');
      });

      it('should close the pdf', async () => {
        await weExpect(element(by.id('pdf-button-close'))).toBeVisible();
        await element(by.id('pdf-button-close')).tap();
        await waitForNotVisible('pdf-screen');
        await weExpect(element(by.id('pdf-button-close'))).toBeNotVisible();
      });
    });

    it('should see lesson tab icon without notification', async () => {
      await weExpect(element(by.id('lesson-notification'))).toBeNotVisible();
    });
  });

  describe('1 resource only', () => {
    beforeAll(async () => {
      await element(by.id('header-back')).tap();
      await tapCardOnSection('catalog-section-recommended-items', 1);
      await getLessonTab(element).tap();
    });

    it('should be redirected to lesson tab', async () => {
      await getLessonTab(element).tap();
      await waitForVisible('lesson-screen');
    });

    it('should not see resources browser', async () => {
      // eslint-disable-next-line no-undef
      await waitFor(element(by.id('resources-browser'))).toNotExist();
    });
  });

  describe('Without resource', () => {
    beforeAll(async () => {
      await element(by.id('header-back')).tap();
      await tapCardOnSection('catalog-section-recommended-items', 5);
    });

    it('should not be redirected to lesson tab', async () => {
      await getLessonTab(element).tap();
      await weExpect(element(by.id('lesson-screen'))).toBeNotVisible();
    });
  });
});
