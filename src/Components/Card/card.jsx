//we have createad a function and it can be called in main app.js file and it will return hello world when we call it in app.js file

/*
function card(){
    return('hello world');

}
export default card;
*/

import React from 'react'
import App from '../../App'
const card = () => {
  return (
    <div>

        <div className="Nav">
            This is Nav bard
        </div>
      <card />
    </div>
  )
}

export default card
