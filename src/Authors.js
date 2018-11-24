import React from 'react'
import './App.css'

const Authors = (props) => (
    <div>
        {props.authors.map((author)=>{
            return <p key={author}>{author}</p>
        })}
    </div>
)

export default Authors; 