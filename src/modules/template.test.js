// @flow strict

import {parseTemplate, TEMPLATE_PART_TYPE} from './template';
import type {TemplatePart} from './template';

describe('Questions', () => {
  describe('parseTemplate', () => {
    it('should handle empty template', () => {
      const result = parseTemplate('');
      const expected: Array<TemplatePart> = [];
      expect(result).toEqual(expected);
    });

    it('should parse the template', () => {
      const result = parseTemplate('{{inp123}} is {{sel456}}!');
      const expected: Array<TemplatePart> = [
        {type: TEMPLATE_PART_TYPE.INPUT, value: 'inp123'},
        {type: TEMPLATE_PART_TYPE.STRING, value: ' is '},
        {type: TEMPLATE_PART_TYPE.INPUT, value: 'sel456'},
        {type: TEMPLATE_PART_TYPE.STRING, value: '!'}
      ];
      expect(result).toEqual(expected);
    });
  });
});
