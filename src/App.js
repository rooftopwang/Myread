import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import HomePage from './zHomePage'
import SearchPage from './zSearchPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = { books: [] };

  typeManager = {
    currentlyReading: "Currently Reading", 
    wantToRead: "Want to Read", 
    read: "Read", 
    none: 'None'
  }


  updateState = (book, shelf) => {
    BooksAPI.update(book, shelf).then(()=>{
      book.shelf = shelf; 
      this.setState((prevState)=>{
        const res = prevState.books.filter((bk)=>(bk.id !== book.id)).concat([book]);
        return {books: res}
      })
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>(
        <HomePage books={this.state.books} updateState={this.updateState} typeManager={this.typeManager} />
      )} />
      <Route exact path="/search" render={()=>(
        <SearchPage books={this.state.books} updateState={this.updateState} />
      )} />
      </div>
    )
  }
}

export default BooksApp
