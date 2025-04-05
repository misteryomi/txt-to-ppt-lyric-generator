const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');

// Directory paths
const LYRICS_DIR = './lyrics';
const PPT_DIR = './ppt';

// Function to generate PowerPoint presentation
function generateLyricsPPTX(lyrics, outputFilename) {
  // Create a new PowerPoint presentation
  const pptx = new PptxGenJS();
  
  // Set default slide size (16:9)
  pptx.defineLayout({ name: 'LAYOUT_16x9', width: 10, height: 5.625 });
  pptx.layout = 'LAYOUT_16x9';
  
  // Process lyrics
  const lines = lyrics.split('\n').filter(line => line.trim() !== '');
  
  // Create slides with two lines per slide
  for (let i = 0; i < lines.length; i += 2) {
    const lyricSlide = pptx.addSlide();
    lyricSlide.background = { color: '000000' }; // Black background
    
    // Add first line
    lyricSlide.addText(lines[i], {
      x: 0.5,
      y: 1.75,
      w: 9,
      h: 0.75,
      color: 'FFFFFF', // White text
      fontFace: 'Arial',
      fontSize: 40,
      align: 'center',
      valign: 'middle'
    });
    
    // Add second line if available
    if (i + 1 < lines.length) {
      lyricSlide.addText(lines[i + 1], {
        x: 0.5,
        y: 3,
        w: 9,
        h: 0.75,
        color: 'FFFFFF', // White text
        fontFace: 'Arial',
        fontSize: 40,
        align: 'center',
        valign: 'middle'
      });
    }
  }
  
  // Save the PowerPoint
  pptx.writeFile({ fileName: outputFilename });
  console.log(`PowerPoint saved as ${outputFilename}`);
}

// Function to process a single lyrics file
function processLyricsFile(filePath, outputDir) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
        return;
      }
      
      // Get the base filename without extension
      const fileBaseName = path.basename(filePath, path.extname(filePath));
      const outputFilename = path.join(outputDir, `${fileBaseName}.pptx`);
      
      generateLyricsPPTX(data, outputFilename);
      resolve();
    });
  });
}

// Function to process all lyrics files in the directory
async function processAllLyricsFiles() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(PPT_DIR)) {
      fs.mkdirSync(PPT_DIR, { recursive: true });
      console.log(`Created output directory: ${PPT_DIR}`);
    }
    
    // Check if lyrics directory exists
    if (!fs.existsSync(LYRICS_DIR)) {
      console.error(`Lyrics directory not found: ${LYRICS_DIR}`);
      console.log('Please create this directory and add your lyrics text files.');
      return;
    }
    
    // Read all files in the lyrics directory
    const files = fs.readdirSync(LYRICS_DIR);
    const textFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');
    
    if (textFiles.length === 0) {
      console.log(`No text files found in ${LYRICS_DIR}`);
      return;
    }
    
    console.log(`Found ${textFiles.length} lyrics file(s) to process.`);
    
    // Process each file
    const promises = textFiles.map(file => {
      const filePath = path.join(LYRICS_DIR, file);
      return processLyricsFile(filePath, PPT_DIR);
    });
    
    await Promise.all(promises);
    console.log('All PowerPoint files have been generated successfully!');
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Start the program
processAllLyricsFiles();