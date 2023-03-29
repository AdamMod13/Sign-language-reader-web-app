import React, { useCallback, useEffect, useRef } from 'react'
import Webcam from 'react-webcam';
import * as mpHands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils'
import DeviceDetector from 'device-detector-js';
import * as drawing_utils from '@mediapipe/drawing_utils';

const HandReaderWebcam = () => {

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let camera = null;

  const onResults = (results: any) => {
    console.log(results)

    if (webcamRef.current && canvasRef.current) {
      canvasRef.current.width = webcamRef.current.video?.videoWidth!
      canvasRef.current.height = webcamRef.current.video?.videoHeight!
    }

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext("2d")
    
    if (canvasCtx && canvasElement) {
      canvasCtx.save();
      canvasCtx.clearRect(0,0,canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    }
    
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      if (canvasCtx) {
        drawing_utils.drawConnectors(
          canvasCtx, landmarks, mpHands.HAND_CONNECTIONS,
          {color: isRightHand ? '#00FF00' : '#FF0000'});
        drawing_utils.drawLandmarks(canvasCtx, landmarks, {
          color: isRightHand ? '#00FF00' : '#FF0000',
          fillColor: isRightHand ? '#FF0000' : '#00FF00',
          radius: (data: drawing_utils.Data) => {
            return drawing_utils.lerp(data.from!.z!, -0.15, .1, 10, 1);
          }
        })
      }
    }   
  }

  useEffect(() => {
    const config = {locateFile: (file: string) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}/${file}`;
    }};

    const hands = new mpHands.Hands(config)

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults(onResults)

    if (typeof webcamRef.current !== undefined && webcamRef.current !== null) {
      camera = new cam.Camera(webcamRef.current.video!, {
        onFrame:async() => {
          await hands.send({image: webcamRef.current?.video!})
        }
      })
      camera.start()
    }

  })
  
  return (
    <div className="bg-gray-500 p-3 shadow-md rounded-md">
      <Webcam audio={false} ref={webcamRef} className="hidden"/>
      <canvas ref={canvasRef} className="h-[350px]">
      </canvas>
    </div>
  )
}

export default HandReaderWebcam


