import React from 'react'

export const Fadetype = ({ee}) => {
  return (
    <div className='btn-group'>
        <button
            onClick={()=>{
                ee.emit("fadetype","logarithmic");
            }}>
            logarithmic 
        </button>
        <button
            onClick={()=>{
                ee.emit("fadetype","linear");
            }}>
            linear
        </button>
        <button
            onClick={()=>{
            ee.emit("fadetype","sCurve");
            }}>
            sCurve
        </button>
        <button
            onClick={()=>{
            ee.emit("fadetype","exponential");
            }}>
            exponential
        </button>
    </div>
  )
}
