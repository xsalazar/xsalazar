const { Moon } = require("lunarphase-js");
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

  const emptySpace = `<img src="./empty.png"  width="17.5" height="17.5">`;
  const clouds = ["☁️", "🌧️", "⛈️", "🌩️"];
  const nightSkyTreats = ["🛸", "🚀", "⭐️", "☄️", "✨"];
  const wave = "🌊";
  const transport = ["⛵", "🛶", "🚤", "🛳", "⛴", "🛥", "🚢"];
  const underwater = [
    "🐟",
    "🐠",
    "🐡",
    "🐙",
    "🦈",
    "🦐",
    "🦑",
    "🐬",
    "🐋",
    "🫧",
    "🦭",
    "🪼",
    "",
  ];
  const deepWater = ["🌿", "🌱", "🪸", "🐚", "🦪", "🦀", "🦞"];

  // There are 15 total rows, top-to-bottom
  for (var row = 0; row < 15; row++) {
    for (var column = 0; column < 48; column++) {
      // Row 0 will contain the sun/moon in its correct position
      // Find out if it's AM or PM
      const { isDay, position, lunarEmoji } = getIsDay();
      if (row === 0) {
        if (column === position) {
          ret += isDay ? "☀️" : lunarEmoji;
        } else {
          if (Math.random() < 0.025 && !isDay) {
            ret +=
              nightSkyTreats[Math.floor(Math.random() * nightSkyTreats.length)];
          } else {
            ret += emptySpace;
          }
        }
      }
      // Rows 1 - 3 will be clouds
      else if (row >= 1 && row <= 2) {
        // 5% chance to draw a random cloud
        if (Math.random() < 0.05) {
          ret += clouds[Math.floor(Math.random() * clouds.length)];
        } else {
          ret += emptySpace;
        }
      }
      // Row 4 will be water/transports
      else if (row === 4) {
        if (Math.random() < 0.05) {
          ret += transport[Math.floor(Math.random() * transport.length)];
        } else {
          ret += wave;
        }
      }
      // Rows 5 - 11 will be fishies
      else if (row >= 5 && row <= 11) {
        if (Math.random() < 0.05) {
          ret += underwater[Math.floor(Math.random() * underwater.length)];
        } else {
          ret += emptySpace;
        }
      }
      // Rows 12 - 14 will be greens
      else {
        if (Math.random() < 0.08) {
          ret += deepWater[Math.floor(Math.random() * deepWater.length)];
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
    0: 24,
    1: 20,
    2: 16,
    3: 12,
    4: 8,
    5: 4,
    6: 48,
    7: 44,
    8: 40,
    9: 36,
    10: 32,
    11: 28,
    12: 24,
    13: 20,
    14: 16,
    15: 12,
    16: 8,
    17: 4,
    18: 48,
    19: 44,
    20: 40,
    21: 36,
    22: 32,
    23: 28,
  };

  const date_pt = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );

  // hours as (HH) format
  const hours = date_pt.getHours();

  // If it's between 6 and 17, let's show the sun and its position across the sky
  if (hours > 6 || hours < 17) {
    return { isDay: true, position: hoursToPositionMap[hours] };
  }
  // Otherwise, let's show the moon, its position across the sky, and it's correct phase
  else {
    return {
      isDay: false,
      position: hoursToPositionMap[hours],
      lunarEmoji: Moon.lunarPhaseEmoji,
    };
  }
}

generateAquarium();
