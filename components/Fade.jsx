import React from 'react'

export const Fade = ({ee}) => {
  return (    
    <div className="btn-group">
        <button
            onClick={()=>{
            ee.emit("statechange","fadein");
            }}>
            fade in
        </button>
        <button
            onClick={()=>{
            ee.emit("statechange","fadeout");
            }}>
            fade out
        </button>
    </div>
    
  )
}
