const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');

/**
 * Generates the output path based on the profile and input path.
 * Appends the profile name if the extension is unchanged.
 * @param {string} inputPath - The full path to the input file.
 * @param {string} outputDir - The target directory for the output file.
 * @param {string} profileName - The name of the compression profile.
 * @param {object} profile - The profile object from the config.
 * @returns {string} The full path for the output file.
 */
function generateOutputPath(inputPath, outputDir, profileName, profile) {
  const inputExt = path.extname(inputPath);
  const inputBaseName = path.basename(inputPath, inputExt);
  const outputExt = profile.extension;

  let outputBaseName;
  if (inputExt.toLowerCase() === outputExt.toLowerCase()) {
    outputBaseName = `${inputBaseName}.${profileName}${outputExt}`;
  } else {
    outputBaseName = `${inputBaseName}${outputExt}`;
  }

  return path.join(outputDir, outputBaseName);
}


/**
 * Processes a single file using a specified compression profile.
 * @param {string} filePath - Path to the file.
 * @param {string} outputDir - Directory to save the compressed file.
 * @param {object} config - Full configuration object.
 * @param {string} profileName - The name of the profile to use.
 */
async function processFile(filePath, outputDir, config, profileName) {
  const profile = config.profiles[profileName];
  const fileExt = path.extname(filePath).toLowerCase();

  if (!profile) {
    console.error(`Error: Profile "${profileName}" not found in configuration.`);
    return;
  }

  // Check if the file extension is in the list of source extensions for the profile
  if (!profile.sourceExtensions || !profile.sourceExtensions.includes(fileExt)) {
    // Silently skip if not a target, or log it for verbosity. For now, silent.
    // console.log(`Skipping ${filePath} for profile "${profileName}" as its extension is not a target.`);
    return;
  }

  const outputPath = generateOutputPath(filePath, outputDir, profileName, profile);
  await fs.ensureDir(outputDir);

  const ffmpegOptions = profile.options.split(' ');

  return new Promise((resolve, reject) => {
    console.log(`[${profileName}] Processing ${path.basename(filePath)} -> ${path.basename(outputPath)}`);
    ffmpeg(filePath)
      .outputOptions(ffmpegOptions)
      .output(outputPath)
      .on('end', () => {
        console.log(`[${profileName}] Successfully converted ${path.basename(filePath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`[${profileName}] Error processing ${path.basename(filePath)}: ${err.message}`);
        // Don't reject the whole batch, just resolve this one as failed.
        resolve();
      })
      .run();
  });
}

module.exports = {
  processFile,
};
