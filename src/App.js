import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onHandleChange = (e) => {
    let {dispatch} = this.props;
    dispatch({type: 'UPDATE_USERNAME', username: e.target.value})
  }

  onUserSearch = () => {
    let {dispatch} = this.props;
    let {username} = this.props;
    fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res})
      })
  }
    onGetRepo = () => {
    let {dispatch} = this.props;
    let {repos_url} = this.props.userprofile;
    fetch(repos_url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({type: 'UPDATE_REPOS', repos: res})
      })
    }
    /*onRepoSearch = () => {
      let {dispatch} = this.props;
      let {search} = this.props.search;
      fetch(`https://api.github.com/search/repositories?q=` +
              `&type=Repositories&sort=stars&per_page=10`)
        .then(res => {
          return res.json()
        })
        .then(res => {
          dispatch({type: 'UPDATE_SEARCH', search: res})
        })
    }*/

    render() {
      let {userprofile} = this.props;
      let repos = this.props.repos.map((repo, i) => {
        return <li key={i}>{repo.name}</li>
      })
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Git App</h1>
        </header>
        <p className='App-intro'></p>
        <h2>{this.props.username}</h2>
        <input type='text'
                onChange={this.onHandleChange}
                value={this.props.user} />
        <button onClick={this.onUserSearch}>Search</button>
        <br />
        <h3>{this.props.userprofile.login}</h3>
        <img src={userprofile.avatar_url}  className='author' alt='' />
        <br />
        <button className='getrepo' onClick={this.onGetRepo}>Get Repos</button>
        {repos}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos,
    search: state.search
  }
}

export default connect(mapStateToProps)(App);
