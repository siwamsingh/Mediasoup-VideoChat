
// default params for better quality

// let params = {
//   // mediasoup params
//   encodings: [
//     {
//       rid: 'r0',
//       maxBitrate: 100000,
//       scalabilityMode: 'S1T3',
//     },
//     {
//       rid: 'r1',
//       maxBitrate: 300000,
//       scalabilityMode: 'S1T3',
//     },
//     {
//       rid: 'r2',
//       maxBitrate: 900000,
//       scalabilityMode: 'S1T3',
//     },
//   ],
//   // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
//   codecOptions: {
//     videoGoogleStartBitrate: 1000
//   }
// }


// params for better scalability and hosting on aws free tier
let params = {
  // mediasoup params
  encodings: [
    {
      rid: 'r0',
      maxFramerate: 20,
      maxBitrate: 50000,  // Reduced from 100000 to 50000 for lower bandwidth
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r1',
      maxFramerate: 20,
      maxBitrate: 150000,  // Reduced from 300000 to 150000
      scalabilityMode: 'S1T3',
    },
  ],
  codecOptions: {
    videoGoogleStartBitrate: 400  // Lowered from 1000 to 500 kbps to save bandwidth
  }
};


export default params;