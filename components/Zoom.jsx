import React from 'react'

export const Zoom = ({ee}) => {
  return (
    <div className="btn-group">
    <button
      type="button"
      title="Zoom in"
      className="btn-zoom-in btn btn-outline-dark"
      onClick={()=>{
        ee.emit("zoomin")
      }}
    >
      zoom in
    </button>
    <button
      type="button"
      title="Zoom out"
      className="btn-zoom-out btn btn-outline-dark"
      onClick={()=>{
        ee.emit("zoomout")
      }}
    >
      zoom out
    </button>
</div>
  )
}
