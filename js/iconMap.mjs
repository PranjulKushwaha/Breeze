export const ICON_MAP = new Map()

addMapping([ 0 ], "clear")
addMapping([ '0n' ], "clearMoon")
addMapping([ 1, 2 ], "partlyCloudy")
addMapping([ '1n', '2n' ], "partlyCloudyMoon")
addMapping([ 3 ], "overcast")
addMapping([ 45, 48 ], "fog")
addMapping([ 3 ], "cloud")
addMapping([ 51 ], "lightDrizzle")
addMapping([ '51n' ], "lightDrizzleMoon")
addMapping([ 53 ], "drizzle")
addMapping([ 55 ], "denseDrizzle")
addMapping([ 56, 57 ], "freezingDrizzle")
addMapping([ 61, 80 ], "lightRain")
addMapping([ '61n', '80n' ], "lightRainMoon")
addMapping([ 63, 81 ], "rain")
addMapping([ 65, 82 ], "heavyRain")
addMapping([ 66, 67 ], "freezingRain")
addMapping([ 71 ], "lightSnow")
addMapping([ 73, 85 ], "Snow")
addMapping([ 75, 86 ], "denseSnow")
addMapping([ 77 ], "snowgrains")
addMapping([ 95 ], "thunder")
addMapping([ 96 ], "moderateThunder")
addMapping([ 99 ], "heavyThunder")


function addMapping(values, icon) {
  values.forEach(value => {
    ICON_MAP.set(value, icon)
  })
}