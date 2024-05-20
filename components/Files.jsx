import React from 'react'

export const Files = ({ee}) => {
  return (
    <div className='btn-group'>
          <button
            onClick={() => {
              ee.emit("startaudiorendering", "wav");
            }}
          >
            Download
          </button>
    </div>
  )
}
