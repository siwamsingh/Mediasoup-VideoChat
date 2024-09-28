import { Device } from 'mediasoup-client'
import { rtpCapabilities, createSendTransport  } from './allExports';

let device: Device;


const createDevice = async () => {
  try {

      device = new Device()

      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
      // Loads the device with RTP capabilities of the Router (server side)
      await device.load({
        // see getRtpCapabilities() below
        routerRtpCapabilities: rtpCapabilities
      })

      console.log('Device RTP Capabilities', device.rtpCapabilities)

      // once the device loads, create transport
      createSendTransport()
    
  } catch (error: any) {
    console.log(error)
    if (error.name === 'UnsupportedError')
      console.warn('browser not supported')
  }
}

export default createDevice;
export { device }