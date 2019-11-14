// @flow

import * as React from 'react';
import Modal from 'react-native-modal';

export type Props = {|
  isVisible?: boolean,
  children: React.Node,
  onClose: () => void
|};

const ModalAnimated = ({isVisible, children, onClose}: Props) => (
  <Modal isVisible={Boolean(isVisible)} onSwipeComplete={onClose} onBackdropPress={onClose}>
    {children}
  </Modal>
);

export default ModalAnimated;
