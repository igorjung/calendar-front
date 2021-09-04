import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 351px;
  height: 100%;

  padding: 32px 0 64px 0;
  background-color: ${colors.primary};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Button = styled.button`
  margin-bottom: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  strong {
    margin-left: 8px;
    color: ${colors.warning};
  }
`;
