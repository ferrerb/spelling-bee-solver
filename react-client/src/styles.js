import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #eee8d5;
    font-family: 'Open Sans', sans-serif;
  }
`;

// TODO: media queries

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1 100%;
  }
`;

export const Header = styled.header`
  font-size: 28px;
`;

export const Label = styled.label`
  margin: 5px;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  margin: 5px;
  border-radius: 0px;
  border: 0px;
  width: 150px;
  height: 20px;
`;

export const FormInput = styled.input`
  width: 150px;
  height: 20px;
`;

export const List = styled.ul`
  flex: 2;
  list-style: none;
  margin: none;
  padding: none;
`;

export const ListItem = styled.li`
  margin: 2px;
`;