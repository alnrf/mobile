// @flow

import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {storiesOf} from '@storybook/react-native';

import answers from '../__fixtures__/answers';
import type {Layout} from '../containers/with-layout';
import {Component as Correction} from './correction';

// eslint-disable-next-line no-console

const question = 'Where is Waldo ?';

// eslint-disable-next-line no-console
const handleButtonPress = () => console.log('Clicked');

const window = Dimensions.get('window');
const fakeLayout: Layout = {
  width: window.width,
  height: window.height - 60
};

storiesOf('Correction', module)
  .add('Bad Answer', () => (
    <View style={fakeLayout}>
      <Correction
        answers={answers}
        userAnswers={answers.concat(['Anything else'])}
        tip={
          "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you"
        }
        isCorrect={false}
        title="Oops..."
        onButtonPress={handleButtonPress}
        question={question}
        subtitle="Bad Answer"
        keyPoint="The KEY POINT"
        layout={fakeLayout}
        isFinished={false}
      />
    </View>
  ))
  .add('Good Answer', () => (
    <View style={fakeLayout}>
      <Correction
        answers={answers}
        userAnswers={answers}
        tip={
          "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you without checking it on Wikipedia before"
        }
        title="Good job!"
        isCorrect
        onButtonPress={handleButtonPress}
        question={question}
        subtitle="Good Answer"
        keyPoint="The KEY POINT"
        layout={fakeLayout}
        isFinished={false}
      />
    </View>
  ))
  .add('With plenty of user answers and questions', () => {
    const plentyOfUserAnswers = answers.concat(answers);
    return (
      <View style={fakeLayout}>
        <Correction
          answers={answers}
          userAnswers={plentyOfUserAnswers}
          tip={
            "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you without checking it on Wikipedia before"
          }
          title="Oops..."
          isCorrect={false}
          onButtonPress={handleButtonPress}
          question={question}
          subtitle="Bad Answer"
          keyPoint="The KEY POINT"
          layout={fakeLayout}
          isFinished={false}
        />
      </View>
    );
  })
  .add('With only one answer', () => (
    <View style={fakeLayout}>
      <Correction
        answers={[answers[0]]}
        userAnswers={[answers[0]]}
        tip={
          "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you without checking it on Wikipedia before"
        }
        title="Good job!"
        isCorrect
        onButtonPress={handleButtonPress}
        question={question}
        subtitle="Good Answer"
        keyPoint="The KEY POINT"
        layout={fakeLayout}
        isFinished={false}
      />
    </View>
  ))
  .add('Last bad Answer', () => (
    <View style={fakeLayout}>
      <Correction
        answers={answers}
        userAnswers={answers.concat(['Anything else'])}
        tip={
          "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you"
        }
        isCorrect={false}
        title="Oops..."
        onButtonPress={handleButtonPress}
        question={question}
        subtitle="Bad Answer"
        keyPoint="The KEY POINT"
        layout={fakeLayout}
        isFinished
      />
    </View>
  ))
  .add('Last good Answer', () => (
    <View style={fakeLayout}>
      <Correction
        answers={answers}
        userAnswers={answers}
        tip={
          "The greatest tip of your life after what daddy said yesterday : don't drink what a stranger has given to you without checking it on Wikipedia before"
        }
        title="Good job!"
        isCorrect
        onButtonPress={handleButtonPress}
        question={question}
        subtitle="Good Answer"
        keyPoint="The KEY POINT"
        layout={fakeLayout}
        isFinished
      />
    </View>
  ));
