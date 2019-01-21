// @flow

import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';
import globby from 'globby';

import type {Translations} from '../src/translations/_types';

const GITHUB_API = 'https://api.github.com';

const headers = {
  Authorization: 'token e931703ca528cc9b5573de89da924747109c641d'
};

const fetchTranslations = (
  locale: string,
  repository: string,
  contentPath: string,
  file: string
  // We don't have any interface for translations
  // eslint-disable-next-line flowtype/no-weak-types
): Promise<Object> => {
  const apiLocale = locale.replace(/-(.*)/, found => '_' + found.replace('-', '').toUpperCase());
  return (
    fetch(
      `${GITHUB_API}/repos/coorpacademy/${repository}/contents/${contentPath}/${apiLocale}/${file}`,
      {
        headers
      }
    )
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(response => Buffer.from(response.content, 'base64').toString('utf8'))
      .then(content => JSON.parse(content))
      // eslint-disable-next-line no-console
      .catch(e => console.error(`Unavailable content for ${apiLocale}.`))
  );
};

const generate = async (locale: string) => {
  const globalTranslations = await fetchTranslations(
    locale,
    'coorpacademy',
    'core/locales',
    'global.json'
  );
  const playerTranslations = await fetchTranslations(
    locale,
    'components',
    'packages/@coorpacademy-player-web/locales',
    'player.json'
  );
  const translations: Translations = {
    advanced: globalTranslations.module_level.advanced,
    base: globalTranslations.module_level.base,
    clue: playerTranslations.Clue,
    coach: globalTranslations.module_level.coach,
    congratulations: playerTranslations['Congratulations!'],
    // $FlowFixMe @todo until we have the wording translated by transiflex
    correction: undefined,
    didYouKnowThat: playerTranslations['Did you know that?'],
    gameOver: playerTranslations['Game over'],
    goodAnswer: playerTranslations['Good answer'],
    goodJob: playerTranslations['Good job'],
    keyPoint: playerTranslations['Key point'],
    lesson: playerTranslations.Media,
    next: playerTranslations.Next,
    nextLevel: playerTranslations['Next level'],
    ouch: playerTranslations.Ouch,
    outOfLives: playerTranslations['You are out of lives!'],
    question: playerTranslations.Question,
    retryLevel: playerTranslations['Retry level'],
    wrongAnswer: playerTranslations['Wrong answer'],
    // $FlowFixMe @todo until we have the wording translated by transiflex
    yourAnswer: undefined,
    // $FlowFixMe @todo until we have the wording translated by transiflex
    yourAnswers: undefined
  };

  const outputFilePath = path.resolve(`${__dirname}/../src/translations/${locale}.js`);
  const properties = Object.keys(translations)
    .map(key => {
      const value = translations[key] !== undefined ? `"${translations[key]}"` : 'undefined';
      return `  ${key}: ${value}`;
    })
    .join(',\n');

  fs.writeFileSync(
    outputFilePath,
    `${'// @flow strict' +
      '\n\n' +
      "import type {Translations} from './_types';" +
      '\n\n' +
      'const translations: Translations = {' +
      '\n' +
      properties +
      '};' +
      '\n\n' +
      'export default translations;' +
      '\n'}`
  );
};

globby
  .sync(path.resolve(`${__dirname}/../src/translations/*.js`), {
    cwd: path.resolve(`${__dirname}/../src`),
    nodir: true
  })
  .map(filePath => path.basename(filePath))
  .filter(file => file !== 'index.js' && file !== '_types.js')
  .map(file => file.replace('.js', ''))
  .forEach(locale => generate(locale));
