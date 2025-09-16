const fs = require('fs-extra');

const DEFAULT_CONFIG_FILENAME = 'compress.config.json';

const defaultConfig = {
  profiles: {
    webm: {
      options: "-c:v libvpx -b:v 2M -crf 10",
      extension: ".webm",
      sourceExtensions: [".mp4", ".mov"]
    },
    hevc: {
      options: "-c:v libx265 -crf 28 -preset medium -tag:v hvc1",
      extension: ".mp4",
      sourceExtensions: [".mp4", ".mov"]
    },
    webp: {
      options: "-quality 80",
      extension: ".webp",
      sourceExtensions: [".png", ".jpg", ".jpeg"]
    },
    avif: {
        options: "-crf 30 -speed 4",
        extension: ".avif",
        sourceExtensions: [".png", ".jpg", ".jpeg"]
    }
  }
};

/**
 * Loads configuration from a file. If the file doesn't exist, returns the default config.
 * @param {string} [filePath] - Path to the config file.
 * @returns {Promise<object>} The configuration object.
 */
async function loadConfig(filePath = DEFAULT_CONFIG_FILENAME) {
  if (await fs.pathExists(filePath)) {
    const userConfig = await fs.readJson(filePath);
    return {
      profiles: { ...defaultConfig.profiles, ...userConfig.profiles },
    };
  }
  return defaultConfig;
}

/**
 * Saves the configuration object to a file.
 * @param {object} config - The configuration object to save.
 * @param {string} [filePath] - Path to the config file.
 * @returns {Promise<void>}
 */
async function saveConfig(config, filePath = DEFAULT_CONFIG_FILENAME) {
  await fs.writeJson(filePath, config, { spaces: 2 });
  console.log(`Configuration saved to ${filePath}`);
}

module.exports = {
  loadConfig,
  saveConfig,
  defaultConfig,
  DEFAULT_CONFIG_FILENAME,
};
