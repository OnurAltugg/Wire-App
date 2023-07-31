import React from 'react'
import './BlogBox.css'

function BlogBox({ title, date, location, picId }) {
  return (
    <div className="eventBox" style={{ backgroundImage: `url(/eventPics/${picId})` }}>
      <div className="eventBoxDate">{date}</div>
      <div className="eventBoxTitle">{title}</div>
      <div className="eventBoxLocation">{location}</div>
    </div>
  )
}

export default BlogBox