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

  const emptySpace = `<img src="./empty.png" width="17.5" height="17.5">`;
  const clouds = ["☁️", "🌧️", "⛈️", "🌩️"];
  const nightSkyTreats = ["🛸", "🚀", "⭐️", "☄️", "✨"];
  const wave = "🌊";
  const transport = ["⛵", "🛶", "🚤", "🛳", "⛴", "🛥", "🚢", "🏖️", "🏝️"];
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
  ];
  const deepWater = ["🌿", "🌱", "🪸", "🐚", "🦪", "🦀", "🦞"];

  // There are 15 total rows, top-to-bottom
  for (var row = 0; row < 15; row++) {
    for (var column = 0; column <= 44; column++) {
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
      // Rows 1 - 2 will be clouds
      else if (row >= 1 && row <= 2) {
        // 5% chance to draw a random cloud
        if (Math.random() < 0.05) {
          ret += clouds[Math.floor(Math.random() * clouds.length)];
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
    0: 20,
    1: 16,
    2: 12,
    3: 8,
    4: 4,
    5: 0,
    6: 44,
    7: 40,
    8: 36,
    9: 32,
    10: 28,
    11: 24,
    12: 20,
    13: 16,
    14: 12,
    15: 8,
    16: 4,
    17: 0,
    18: 44,
    19: 40,
    20: 36,
    21: 32,
    22: 28,
    23: 24,
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
  // Otherwise, let's show the moon, its position across the sky, and it's correct phase
  else {
    return {
      isDay: false,
      position: hoursToPositionMap[hours],
      lunarEmoji: Moon.lunarPhaseEmoji(),
    };
  }
}

generateAquarium();
