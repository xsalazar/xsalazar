const { Moon, NorthernHemisphereLunarEmoji } = require("lunarphase-js");
const fs = require("fs");

// This file will generate a random seascape to display on my GitHub profile page
// The pattern of the generated picture is as follows
// +-----------------------------------------------------------+ {0}
// |                                                           | {1}
// |                                                           | {2}
// |                                                           | {3}
// +-----------------------------------------------------------+ {4}
// |                                                           | {5}
// |                                                           | {6}
// |                                                           | {7}
// |                                                           | {8}
// |                                                           | {9}
// |                                                           | {10}
// +-----------------------------------------------------------+ {11}
// |                                                           | {12}
// |                                                           | {13}
// +-----------------------------------------------------------+ {14}

function generateAquarium() {
  let ret = ""; // This will be written out to README.md

  const emptySpace = `<img src="./assets/empty.png" width="17.5" height="17.5">`;
  const sun = "2600"; // ☀️
  const clouds = [
    "2601", // ☁️
    "1f327", // 🌧️
    "26c8", // ⛈️
    "1f329", // 🌩️
  ];
  const nightSkyTreats = [
    "1f6f8", // 🛸
    "1f680", // 🚀
    "2b50", // ⭐️
    "2604", // ☄️
    "2728", // ✨
  ];
  const wave = "1f30a"; // 🌊
  const transport = [
    "26f5", // ⛵
    "1f6f6", // 🛶
    "1f6a4", // 🚤
    "1f6f3", // 🛳
    "26f4", // ⛴
    "1f6e5", // 🛥
    "1f6a2", // 🚢
    "1f3d6", // 🏖️
    "1f3dd", // 🏝️
  ];
  const underwater = [
    "1f41f", // 🐟
    "1f420", // 🐠
    "1f421", // 🐡
    "1f419", // 🐙
    "1f988", // 🦈
    "1f990", // 🦐
    "1f991", // 🦑
    "1f42c", // 🐬
    "1f40b", // 🐋
    "1fae7", // 🫧
    "1f9ad", // 🦭
    "1fabc", // 🪼
  ];
  const deepWater = [
    "1f33f", // 🌿
    "1f331", // 🌱
    "1fab8", // 🪸
    "1f41a", // 🐚
    "1f9aa", // 🦪
    "1f980", // 🦀
    "1f99e", // 🦞
  ];

  // There are 15 total rows, top-to-bottom
  for (var row = 0; row < 15; row++) {
    for (var column = 0; column < 44; column++) {
      // Row 0 will contain the sun/moon in its correct position
      // Find out if it's AM or PM
      const { isDay, position, lunarEmoji } = getIsDay();
      if (row === 0) {
        if (column === position) {
          ret += isDay
            ? wrapEmoji(sun, Math.random() < 0.01)
            : wrapEmoji(lunarEmoji);
        } else {
          if (Math.random() < 0.025 && !isDay) {
            ret += wrapEmoji(
              nightSkyTreats[Math.floor(Math.random() * nightSkyTreats.length)],
              Math.random() < 0.01
            );
          } else {
            ret += emptySpace;
          }
        }
      }
      // Rows 1 - 2 will be clouds
      else if (row >= 1 && row <= 2) {
        if (Math.random() < 0.05) {
          ret += wrapEmoji(
            clouds[Math.floor(Math.random() * clouds.length)],
            Math.random() < 0.01
          );
        } else {
          ret += emptySpace;
        }
      }
      // Row 3 will be empty
      else if (row === 3) {
        ret += emptySpace;
      }
      // Row 4 will be water/transports
      else if (row === 4) {
        if (Math.random() < 0.05) {
          ret += wrapEmoji(
            transport[Math.floor(Math.random() * transport.length)]
          );
        } else {
          if (Math.random() < 0.005) {
            // 0.5% chance to replace wave with jumping dolphin
            // In the water section due to how the animation looks
            ret += wrapEmoji("1f42c", true);
          } else if (Math.random() < 0.005) {
            // 0.5% chance to replace wave with shark
            // In the water section due to how the animation looks
            ret += wrapEmoji("1f988", true);
          } else {
            ret += wrapEmoji(wave);
          }
        }
      }
      // Rows 5 - 11 will be fishies
      else if (row >= 5 && row <= 11) {
        if (Math.random() < 0.05) {
          ret += wrapEmoji(
            underwater[Math.floor(Math.random() * underwater.length)],
            Math.random() < 0.01
          );
        } else {
          ret += emptySpace;
        }
      }
      // Rows 12 - 14 will be greens
      else {
        if (Math.random() < 0.08) {
          ret += wrapEmoji(
            deepWater[Math.floor(Math.random() * deepWater.length)],
            Math.random() < 0.01
          );
        } else {
          ret += emptySpace;
        }
      }
    }

    // Start the next line
    ret += `\n\n`;
  }

  fs.writeFileSync(`./README.md`, ret);
}

/**
 * Helper function to find the sun/moon position in the sky
 * @returns {{isDay: bool, position: number, lunarEmoji?: string }}
 */
function getIsDay() {
  const hoursToPositionMap = {
    0: 19,
    1: 15,
    2: 11,
    3: 7,
    4: 3,
    5: 0,
    6: 43,
    7: 39,
    8: 35,
    9: 31,
    10: 27,
    11: 23,
    12: 19,
    13: 15,
    14: 11,
    15: 7,
    16: 3,
    17: 0,
    18: 43,
    19: 39,
    20: 35,
    21: 31,
    22: 27,
    23: 23,
  };

  const moonPhases = {
    new: "1f311", // 🌑
    waxingCrescent: "1f312", // 🌒
    firstQuarter: "1f313", // 🌓
    waxingGibbous: "1f314", // 🌔
    full: "1f315", // 🌕
    waningGibbous: "1f316", // 🌖
    lastQuarter: "1f317", // 🌗
    waningCrescent: "1f318", // 🌘
  };

  const date_pt = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  // hours as (HH) format
  const hours = date_pt.getHours();

  // If it's between 6 and 17, let's show the sun and its position across the sky
  if (hours >= 6 && hours <= 17) {
    return { isDay: true, position: hoursToPositionMap[hours] };
  }
  // Otherwise, let's show the moon, its position across the sky, and its correct phase
  else {
    let lunarEmoji;
    switch (Moon.lunarPhaseEmoji()) {
      case NorthernHemisphereLunarEmoji.NEW:
        lunarEmoji = moonPhases.new;
        break;
      case NorthernHemisphereLunarEmoji.WAXING_CRESCENT:
        lunarEmoji = moonPhases.waxingCrescent;
        break;
      case NorthernHemisphereLunarEmoji.FIRST_QUARTER:
        lunarEmoji = moonPhases.firstQuarter;
        break;
      case NorthernHemisphereLunarEmoji.WAXING_GIBBOUS:
        lunarEmoji = moonPhases.waxingGibbous;
        break;
      case NorthernHemisphereLunarEmoji.FULL:
        lunarEmoji = moonPhases.full;
        break;
      case NorthernHemisphereLunarEmoji.WANING_GIBBOUS:
        lunarEmoji = moonPhases.waningGibbous;
        break;
      case NorthernHemisphereLunarEmoji.LAST_QUARTER:
        lunarEmoji = moonPhases.lastQuarter;
        break;
      case NorthernHemisphereLunarEmoji.WANING_CRESCENT:
        lunarEmoji = moonPhases.waningCrescent;
        break;
    }

    return {
      isDay: false,
      position: hoursToPositionMap[hours],
      lunarEmoji: lunarEmoji,
    };
  }
}

/**
 * Helper function to wrap emoji in `<g-emoji>` tag for consistent rendering on GitHub
 * @param {string} emoji
 * @param {boolean} isAnimated
 * @returns {string}
 */
function wrapEmoji(emoji, isAnimated = false) {
  if (isAnimated && fs.existsSync(`./assets/${emoji}.gif`)) {
    return `<img src="./assets/${emoji}.gif" width="17.5" height="17.5" />`;
  }

  return `<img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/main/2D/png/72/emoji_u${emoji}.png" width="17.5" height="17.5" />`;
}

generateAquarium();
