# Subtitle Translation Script

This script processes all `.srt` files in the `data` folder and translates their content from English to Vietnamese.

## Prerequisites

1. **Node.js** installed on your machine.
2. Required dependencies installed (see [Installation](#installation)).

## Folder Structure

Ensure the following structure:

```
project-folder/
├── data/               # Contains your .srt files
├── src/                # Contains your script file (e.g., index.js)
├── package.json        # Node.js project configuration
└── README.md           # This file
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Place all `.srt` files you want to translate in the `data` folder.
2. Run the script:
   ```bash
   npm start
   ```

## Output

All translated `.srt` files will be saved as `.vi.srt`

## Notes

- Ensure your `.srt` files are UTF-8 encoded.
- If you encounter any issues, check the `src/index.js` file for error handling and modify it as needed.
