import React, { useState } from 'react';

import {
  Wrapper,
  Label,
  Form,
  FormInput,
  List,
  ListItem
} from './styles';

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
        throw new Error('Error while fetching data');
      }

      const data = await response.json();
      setMatches(data);
    } catch (e) {
      console.log(e);
    }
  }

  // TODO: make this a component
  return (<Wrapper>
    <Form onSubmit={handleSubmit}>
      <Label>Required:
        <input 
          name='required'
          placeholder='Required middle character'
          type='text'
          value={required}
          onChange={handleChange} />
      </Label>
      <Label>Optional:
        <input 
          name='optional'
          placeholder='Optional outer characters'
          type='text'
          value={optional}
          onChange={handleChange} />
      </Label>
      <FormInput type='submit' value='Submit' />
    </Form>
    <Matches matches={matches} />
  </Wrapper>);
}

const Matches = ({matches}) => {
  const allMatches = matches.map(m => <Match match={m} />);

  return (
    <List>
      {allMatches}
    </List>
  )
}

const Match = ({match}) => {
  return (
    <ListItem key={match.word}>
      <span>{match.word} {match.isPangram ? 'PANGRAM' : ''}</span>
    </ListItem>
  );
}

export default App;