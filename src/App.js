import React from 'react';
//import moment from 'moment';
import Apps from './Apps.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      sort: '',
      genre: '',
      error: null
    }
  }


  setSort = (sort) => {
    this.setState({
      sort
    })
  }

  setGenre = genre => {
    this.setState({
      genre
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genre) {
      params.push(`sort=${this.state.genre}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not process request.'
        });
      })
  }



  render() {

    return (
      <div>
        <form
          onSubmit={e => this.handleSubmit(e)}>

          <select
            id='sort'
            name='sort'
            onChange={e => this.setSort(e.target.value)}>
            <option>Rating</option>
            <option>App</option>
          </select>
          <select
            id='genre'
            name='genre'
            onChange={e => this.setGenre(e.target.value)}>
            <option>Action</option>
            <option>Puzzle</option>
            <option>Strategy</option>
            <option>Casual</option>
            <option>Arcade</option>
            <option>Card</option>
          </select>
          <button type='submit'>Submit</button>
        </form>
        {this.state.apps.map((app, i) => {
          return <Apps {...app} key={i} />
        })}
      </div>
    )
  }
}

export default App;
