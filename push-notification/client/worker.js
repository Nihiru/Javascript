console.log('Servie Worker loaded...')

self.addEventListener('push', e=>{
    const data = e.data.json()
    console.log('Push Recevived...')
    self.registration.showNotification(data.title, {
        body: 'Notified by Nihiru',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    })
})