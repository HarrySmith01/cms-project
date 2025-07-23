// C:\Users\Pubg\Documents\cms-project\tests\generate-structure.js
// Description: Temporary script to scan project folders/files from root and generate markdown structure for docs/project-structure.md, skipping node_modules
// Created: July 22, 2025, 03:50 PM IST
// Updated: July 22, 2025, 03:50 PM IST
const fs = require('fs');
const path = require('path');

function generateStructure(dir = '.', depth = 0) {
  let result = '';
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach((file) => {
    if (file.name === 'node_modules' || file.name.startsWith('.')) return; // Skip node_modules and hidden files/folders
    result += `${'  '.repeat(depth)}- ${file.name}${file.isDirectory() ? '/' : ''}\n`;
    if (file.isDirectory()) {
      result += generateStructure(path.join(dir, file.name), depth + 1);
    }
  });
  return result;
}

const structure = `# Project Structure\n${generateStructure('.')}`;
fs.writeFileSync('docs/project-structure.md', structure);
console.log('Project structure generated in docs/project-structure.md');
