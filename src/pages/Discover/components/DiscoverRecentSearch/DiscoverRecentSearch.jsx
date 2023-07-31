import React from 'react'
import './DiscoverRecentSearch.css'

import { AiOutlineCloseCircle } from 'react-icons/ai'

function DiscoverRecentSearch({ searchKey }) {
  return (
    <div className='recentSearch'>
      <AiOutlineCloseCircle size={"1em"}/>
      <p className='searchKey'>{searchKey}</p>
    </div>
  )
}

export default DiscoverRecentSearch