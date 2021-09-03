// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as S from './styles';
import * as I from '~/styles/icons';

export default function Header({ profile }) {
  return (
    <S.Wrapper>
      <S.Container>
        <I.IconCalendar />
        <S.Nav>
          <I.IconUser />
          <strong>{profile && profile.name}</strong>
        </S.Nav>
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
