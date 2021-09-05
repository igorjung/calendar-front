// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function Modal({ name, onClose, open, children }) {
  return (
    <S.Container isOpen={open} contentLabel={name} ariaHideApp={false}>
      <S.Content>
        <S.Header>
          <h1>{name}</h1>
          <S.Button type="button" onClick={onClose}>
            <I.IconClose size={24} />
          </S.Button>
        </S.Header>
        {children}
      </S.Content>
    </S.Container>
  );
}

// Props
Modal.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
