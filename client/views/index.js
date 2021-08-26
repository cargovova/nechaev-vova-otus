Notification.requestPermission((status) => {
  console.log('Notification permission status:', status)
  if (status == 'granted') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then((reg) => navigator.serviceWorker.ready.then((worker) => {
          worker.sync.register('syncdata')
        }))
        .catch((err) => console.log(err))
    }
  }
})
