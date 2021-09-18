const constraints = {
  video: { facingMode: 'user' },
  audio: false
}

const cameraView = document.querySelector('#camera--view'),
      cameraOutput = document.querySelector('#camera--output'),
      cameraSensor = document.querySelector('#camera--sensor'),
      cameraTrigger = document.querySelector('#camera--trigger')

const cameraStart = () => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      track = stream.getTracks()[0]
      cameraView.srcObject = stream
    })
    .catch(console.error)
    

}

cameraTrigger.onclick = () => {
  cameraSensor.width = cameraView.videoWidth
  cameraSensor.height = cameraView.videoHeight
  cameraSensor.getContext('2d').drawImage(cameraView, 0, 0)
  cameraOutput.src = cameraSensor.toDataURL('image/webp')
  cameraOutput.classList.add('taken')
}

window.addEventListener('load', cameraStart, false)

