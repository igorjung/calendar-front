// Dependencies
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import { signOut } from '~/store/modules/auth/actions';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function Header({ profile }) {
  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <S.Container>
        <S.Nav>
          <I.IconUser />
          <strong>{profile && profile.name}</strong>
        </S.Nav>
        <S.Button type="button" onClick={() => dispatch(signOut)}>
          <I.IconLogout />
          <strong>Sair</strong>
        </S.Button>
      </S.Container>
    </S.Wrapper>
  );
}

// Props
Header.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Header.defaultProps = {
  profile: null,
};
