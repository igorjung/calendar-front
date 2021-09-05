import styled from 'styled-components';

// Color Schema
import colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Header = styled.header`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin-left: 16px;
    font-size: 18px;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.tertiary};
    border-radius: 30px;
  }

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Division = styled.ul`
  width: 70px;
  height: 100%;

  display: grid;
  grid-row: repeat('40px', 24);

  li {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    border-right: 1px solid #ddd;

    hr {
      width: 10px;
      height: 1px;
      margin-left: 4px;
    }
  }
`;

export const Grid = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-row: repeat('40px', 24);

  li {
    height: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    border-bottom: 1px solid #ddd;
  }
`;

export const Item = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${colors.secondary};

  strong {
    color: #fff;
  }
`;
