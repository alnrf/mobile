// @flow

import * as React from 'react';
import ModalBase from 'react-native-modal';

export type Props = {|
  children: React.Node,
  isVisible?: boolean,
  onClose?: () => void
|};

const Modal = ({isVisible = false, onClose, children}: Props) => (
  <ModalBase isVisible={isVisible} onSwipeComplete={onClose} onBackdropPress={onClose}>
    {children}
  </ModalBase>
);

export default Modal;
