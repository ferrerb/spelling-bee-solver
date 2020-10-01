import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1 100%;
  }
`;

export const Header = styled.header`
  background: yellow;
`;

export const Label = styled.label`
  padding: 2px;
`;

export const Form = styled.form`
  flex: 1;
`;

export const Input = styled.input`
`;

export const FormInput = styled.input`
`;

export const List = styled.ul`
  flex: 2;
  list-style: none;
  margin: none;
  padding: none;
`;

export const ListItem = styled.li`
  padding: 5px;
`;