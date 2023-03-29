import React from 'react'

const HandReaderSettings = () => {
  return (
    <div className='flex flex-col justify-center align-top bg-slate-600 text-white py-5 px-5 rounded-md shadow-md gap-6'>
      <h1 className="font-semibold text-lg">Sign Language Reader</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between">
          <h2>FPS: </h2>
          <p>8</p>
        </div>
        <div className="flex justify-between">
          <h2>Number of Hands: </h2>
          <p>1</p>
        </div>
        <div className="flex justify-between">
          <h2>Model Complexity: </h2>
          <p>FULL</p>
        </div>
        <div className="flex justify-between">
          <h2>FPS: </h2>
          <p>8</p>
        </div>
      </div>
      

    </div>
  )
}

export default HandReaderSettings
