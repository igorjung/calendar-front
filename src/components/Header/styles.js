import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  padding: 0 32px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  background-color: ${colors.primary};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  strong {
    margin-left: 8px;
  }
`;

export const Button = styled.button`
  padding-left: 32px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  strong {
    margin-left: 8px;
    color: ${colors.warning};
  }
`;
