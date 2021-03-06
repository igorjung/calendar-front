// Dependencies
import styled from 'styled-components';
import Modal from 'react-modal';

// Color Schema
import colors from '~styles/colors';

// StyledComponents
export const Container = styled(Modal)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  height: 500px;
  width: 600px;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background: ${colors.primary};
  border-radius: 10px;
  overflow-y: auto;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.primary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.tertiary};
    border-radius: 30px;
  }
`;

export const Header = styled.header`
  width: 100%;
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${colors.tertiary};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: ${colors.tertiary};
    font-size: 22px;
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
