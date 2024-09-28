const createWebRtcTransport = async (router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const webRtcTransport_options = {
        listenIps: [
          {
            ip: '0.0.0.0', 
            announcedIp: '127.0.0.1',   
          }
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      }

      let transport = await router.createWebRtcTransport(webRtcTransport_options)
      console.log(`transport id from createWebRRtcTransport: ${transport.id}`)

      transport.on('dtlsstatechange', dtlsState => {
        if (dtlsState === 'closed') {
          transport.close()
        }
      })

      transport.on('close', () => {
        console.log('transport closed')
      })

      resolve(transport)

    } catch (error) {
      reject(error)
    }
  })
}

export default createWebRtcTransport;