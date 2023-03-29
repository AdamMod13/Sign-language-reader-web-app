import React from 'react'
import HandReaderSettings from './HandReaderComponents/HandReaderSettings'
import HandReaderWebcam from './HandReaderComponents/HandReaderWebcam'

const HandReader = () => {
  return (
    <div className='flex justify-between items-center'>
      <HandReaderWebcam />
      <HandReaderSettings />
    </div>
  )
}

export default HandReader
