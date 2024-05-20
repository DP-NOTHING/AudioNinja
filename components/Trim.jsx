import React from 'react'

export const Trim = ({ee}) => {
  return (
    <div className="btn-group">
        <button
            onClick={() => {
                ee.emit("statechange","select");
            }}
          >
            Select
        </button>
        
        <button
              onClick={() => {
                  ee.emit("trim");
                  ee.emit("custom");
                  ee.emit("rewind");
              }}
            >
              trim
          </button>
        
    </div>
  )
}
