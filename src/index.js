const fs = require('fs-extra');
const path = require('path');
const { loadConfig } = require('./config');
const { processFile } = require('./compress');

/**
 * Main function to run the compression process.
 * @param {string} inputPath - Path to the input file or directory.
 * @param {object} options - Command line options.
 */
async function run(inputPath, options) {
  const config = await loadConfig(options.config);
  
  // Determine which profiles to run
  const profilesToRun = options.profile ? [options.profile] : Object.keys(config.profiles);

  // Validate that the specified profile exists if one was provided
  if (options.profile && !config.profiles[options.profile]) {
    console.error(`Error: Profile "${options.profile}" not found in configuration.`);
    console.log('\nAvailable profiles:');
    Object.keys(config.profiles).forEach(p => {
        console.log(`  - ${p}`);
    });
    return;
  }

  const stats = await fs.stat(inputPath);
  const outputDir = options.output || (stats.isDirectory() ? inputPath : path.dirname(inputPath));

  const filesToProcess = [];
  if (stats.isDirectory()) {
    const files = await fs.readdir(inputPath);
    for (const file of files) {
      const filePath = path.join(inputPath, file);
      if ((await fs.stat(filePath)).isFile()) {
        filesToProcess.push(filePath);
      }
    }
  } else {
    filesToProcess.push(inputPath);
  }

  console.log(`Found ${filesToProcess.length} file(s) to process with ${profilesToRun.length} profile(s).`);

  // Process each file with each selected profile
  for (const filePath of filesToProcess) {
    for (const profileName of profilesToRun) {
      await processFile(filePath, outputDir, config, profileName);
    }
  }

  console.log('All processing tasks are complete.');
}

module.exports = { run };
