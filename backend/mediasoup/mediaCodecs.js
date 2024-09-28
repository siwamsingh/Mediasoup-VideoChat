// default media codeces for better quality
// const mediaCodecs = [
//   {
//     kind: 'audio',
//     mimeType: 'audio/opus',
//     clockRate: 48000,
//     channels: 2,
//   },
//   {
//     kind: 'video',
//     mimeType: 'video/VP8',
//     clockRate: 90000,
//     parameters: {
//       'x-google-start-bitrate': 1000,
//     },
//   },
// ]

// media codeces for better scalability and hosting
const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,  // Keep the standard clock rate for Opus audio
    channels: 2,  // Stereo audio
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,  // Standard clock rate for video codecs
    parameters: {
      'x-google-start-bitrate': 300,  // Start with a lower bitrate to target 360p
      'x-google-min-bitrate': 100,    // Minimum bitrate for very low quality
      'x-google-max-bitrate': 500,    // Cap bitrate for 360p video
    },
  },
];


export default mediaCodecs