export const VIDEO_MAP = new Map()

addMapping([ 0 ], "clear.mp4")
addMapping([ 1, 2 ], "partlyCloud.mp4")
addMapping([3], "cloud.mp4")
addMapping([ 45, 48 ], "fog.mp4")
addMapping([ 51,53,55,56,57,61,80,63,81, 65, 82 , 66 , 67 ], "rain.mp4")
// addMapping([ ], "heavyRain.mp4")
// addMapping([ 66, 67 ], "freezingRain")
addMapping([ 71 , 73, 85, 75, 86 ,77 ], "snow.mp4")
addMapping([ 95 , 96 , 99 ], "thunder.mp4")


function addMapping(values, icon) {
  values.forEach(value => {
    VIDEO_MAP.set(value, icon)
  })
}