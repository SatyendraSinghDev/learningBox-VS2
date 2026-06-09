const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');

const dir = process.cwd();
const ignorePrefixes = [
  '.git/',
  'node_modules/',
  '.vercel/',
  '.vscode/',
  'dist/',
  'build/',
  'stencil-dist/',
];

function shouldIgnore(relPath) {
  if (!relPath) return true;
  for (const prefix of ignorePrefixes) {
    if (relPath === prefix.slice(0, -1) || relPath.startsWith(prefix)) return true;
  }
  return false;
}

async function walk(currentDir) {
  const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
    if (shouldIgnore(relPath)) continue;
    if (entry.isDirectory()) {
      paths.push(...await walk(fullPath));
    } else if (entry.isFile()) {
      paths.push(relPath);
    }
  }
  return paths;
}

async function main() {
  if (!fs.existsSync(path.join(dir, '.git'))) {
    console.log('Initializing git repository...');
    await git.init({ fs, dir, defaultBranch: 'master_09_06_2026' });
  }

  const files = await walk(dir);
  console.log(`Staging ${files.length} files...`);
  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  const oid = await git.commit({
    fs,
    dir,
    author: {
      name: 'Satyendra Singh',
      email: 'satyendra@example.com',
    },
    message: 'Commit MFE code with .gitignore',
  });

  console.log('Commit created:', oid);
}

main().catch(err => {
  console.error('Error:', err.message || err);
  process.exit(1);
});