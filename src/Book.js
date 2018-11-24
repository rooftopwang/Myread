import React from 'react'
import Authors from './Authors'
import PropTypes from 'prop-types'

class Books extends React.Component {
    
    state = {
        select : "none"
    }
    componentWillMount(){
        for(const bk of this.props.books){
            if(bk.title === this.props.user.title){
                this.setState({select: bk.shelf})
            }
        }
    }


    changeShelf = (event) => {
        const book = this.props.user; 
        const shelf = event.target.value;  
        this.props.updateState(book, shelf);
    }
    render (){
        
        const user = this.props.user;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    {user.imageLinks ? (
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${user.imageLinks.smallThumbnail})` }}></div>
                    ):(
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(http://www.udavumullangal.org/images/404.png)` }}></div>
                    )}
                    <div className="book-shelf-changer">
                        <select onChange={this.changeShelf} value={this.state.select}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{user.title}</div>
                    <div className="book-authors">{(user.authors && user.authors.length > 0) && <Authors authors={user.authors}/>}</div>
                </div>
            </li>
        )
    }
}

Books.propTypes={
    updateState:PropTypes.func.isRequired,
    books:PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    
  }
export default Books