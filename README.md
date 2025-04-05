# Text to PPT Lyrics Generator

This project is a simple application that converts lyrics text files into PowerPoint presentations. It reads `.txt` files containing lyrics from a specified directory and generates `.pptx` files with the lyrics formatted for presentation.

## Project Structure

```
text-to-ppt-lyrics-generator
├── lyrics
│   └── (place your .txt files here)
├── ppt
│   └── (generated .pptx files will be saved here)
├── index.js
├── package.json
└── README.md
```

### Directories

- **lyrics/**: This directory is intended for storing the lyrics text files. Users should place their `.txt` files here.
- **ppt/**: This directory is where the generated PowerPoint presentation files (`.pptx`) will be saved.

### Files

- **index.js**: This file contains the main logic for generating PowerPoint presentations from lyrics text files. It includes functions to read lyrics files, create slides, and save the presentations.
- **package.json**: This file is the configuration file for npm. It lists the project dependencies, scripts, and metadata such as the project name and version.

## Usage

1. Place your lyrics text files in the `lyrics/` directory.
2. Run the application using Node.js. This will generate PowerPoint presentations in the `ppt/` directory.
3. Open the generated `.pptx` files using Microsoft PowerPoint or any compatible presentation software.

## Installation

To install the necessary dependencies, run:

```
npm install
```

## License

This project is licensed under the MIT License.