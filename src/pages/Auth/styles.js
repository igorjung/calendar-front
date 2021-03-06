import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1120px;
  padding: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 32px;
  }

  @media (max-width: 990px) {
    padding: 32px;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  h1 {
    margin-bottom: 32px;
  }
`;

export const Footer = styled.footer`
  width: 100%;
  margin-top: 16px;
  padding-bottom: 64px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  a {
    margin-left: 8px;
    text-decoration: underline;
    color: ${colors.tertiary};
  }
`;
