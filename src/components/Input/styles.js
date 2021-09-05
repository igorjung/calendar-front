import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  border-radius: 5px;

  input {
    padding-right: 60px;
  }

  button {
    position: absolute;
    top: 0;
    right: 15px;

    height: 40px;
    width: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;
