import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Books from './Book'

class zSearchPage extends React.Component {

    state = {
        searchUsers : [],
        searchKeywords : ""
    }
    
    handleSearchInput = (event)=>{
        const tempValue = event.target.value; 
        this.setState(() => {
            return {searchKeywords : tempValue}
        }, ()=>{
            if(this.state.searchKeywords){
                BooksAPI.search(this.state.searchKeywords.trim()).then((results)=>{
                    const tempres = results; 
                    this.setState(()=>{
                        return {searchUsers : tempres}
                    })
                });
            }else{
                this.setState({searchUsers: []})
            }
            
        })
        
    }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearchInput} 
                value={this.state.searchKeywords}/>
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
                {(this.state.searchUsers && this.state.searchUsers.length > 0) && this.state.searchUsers.map((user)=>(<Books user={user} key={user.id} books={this.props.books} updateState={this.props.updateState}/>))}
            </ol>
            </div>
        </div>
        )
    }


}

zSearchPage.propTypes={
    updateState:PropTypes.func.isRequired,
    books:PropTypes.array.isRequired
  }
export default zSearchPage