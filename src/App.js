import React from 'react';
import UsernameForm from './components/UsernameForm.js'


class App extends React.Component {
  constructor() {
    super()
    this.onUsernameSubmitted=this.onUsernameSubmitted.bind(this)
  }
  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(reponse => {
      console.log('success')
    })
    .catch(error => {
      console.error(error)
    })
  }

  render (){
  return ( <UsernameForm onSubmit={this.onUsernameSubmitted} />
   );
  }
}

export default App;
