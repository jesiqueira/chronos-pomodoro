self.onmessage = function (event) {
  console.log('Worker recebeu: ', event.data)

  self.postMessage('Olá para você também')
}
