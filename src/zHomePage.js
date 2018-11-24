import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import Books from './Book'
import PropTypes from 'prop-types'

class zHomePage extends React.Component {

typeManager =  this.props.typeManager

render () {
    const books=this.props.books;
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            Object.keys(this.typeManager).map((type) => (
              (type !== 'none')
              && (
                <div key={type}>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.typeManager[type]}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          books.filter((book)=>book.shelf === type).map((user)=>
                          <Books user={user} key={user.id} books={books} updateState={this.props.updateState}/>
                          )
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              )
            ))
          }
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search">Add a book</Link>
        </div>
      </div>
      
    )
}


}
zHomePage.propTypes={
  updateState:PropTypes.func.isRequired,
  books:PropTypes.array.isRequired,
  typeManager: PropTypes.object.isRequired
}
export default zHomePage