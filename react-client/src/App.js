import React, { useState } from 'react';

import {
  GlobalStyle,
  Wrapper,
  Label,
  Form,
  FormInput,
  SubmitButton,
  List,
  ListItem,
  Header
} from './styles';

// TODO: Reorganize all this. Dealing with state in plain React is kind of obnoxious using callbacks
const App = () => {
  const [required, setRequired] = useState('');
  const [optional, setOptional] = useState('');
  const [matches, setMatches] = useState([]);

  const handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;

    if (name === 'required') { setRequired(value); }
    if (name === 'optional') { setOptional(value); }
  }

  const handleSubmit = async event =>{
    event.preventDefault();
    // TODO: pull this out to some service api thing and wrap fetches
    try {
      const response = await fetch(`/api/matches?required=${required}&optional=${optional}`);
      if (response.status >= 400) {
        console.log(response);
        // TODO: Error boundaries
        throw new Error('Error while fetching data');
      }

      const data = await response.json();
      setMatches(data);
    } catch (e) {
      console.log(e);
    }
  }

  // TODO: Make components of this ish
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header>Spelling Bee Solver!</Header>
        <Form onSubmit={handleSubmit}>
          <Label>Required:
            <FormInput 
              name='required'
              placeholder='Required middle character'
              type='text'
              value={required}
              onChange={handleChange} />
          </Label>
          <Label>Optional:
            <FormInput 
              name='optional'
              placeholder='Optional outer characters'
              type='text'
              value={optional}
              onChange={handleChange} />
          </Label>
          <SubmitButton type='submit'>Submit!</SubmitButton>
        </Form>
        <Matches matches={matches} />
      </Wrapper>
    </> 
  );
}

const Matches = ({matches}) => {
  const allMatches = matches.map(m => <Match key={m.word} match={m} />);

  return (
    <List>
      {allMatches}
    </List>
  )
}

const Match = ({match: { word, isPangram }}) => {
  return (
    <ListItem>
      <span>{word} {isPangram ? 'PANGRAM' : ''}</span>
    </ListItem>
  );
}

export default App;