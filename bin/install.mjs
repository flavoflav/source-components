#!/usr/bin/env node
/**
 * Installs the Drupal Source component library into a Canvas / Nebula project.
 *
 *   cd my-nebula-app
 *   npx drupal-source-components
 *
 * Copies every component into the project's configured component directory and
 * merges the theme token ramps into its global CSS. Existing components are
 * never overwritten unless --force is passed.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const SRC_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const START = '/* >>> drupal-source-components : theme tokens >>> */';
const END = '/* <<< drupal-source-components : theme tokens <<< */';
const REQUIRED_DEPS = ['drupal-canvas', 'react', 'swr', 'drupal-jsonapi-params'];

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const valueOf = (f, d) => {
  const i = argv.indexOf(f);
  return i > -1 && argv[i + 1] ? argv[i + 1] : d;
};

const positional = argv.filter(
  (a, i) => !a.startsWith('--') && !['--target', '--only'].includes(argv[i - 1]),
);

const opts = {
  target: path.resolve(valueOf('--target', positional[0] ?? '.')),
  force: has('--force'),
  dryRun: has('--dry-run'),
  noTheme: has('--no-theme'),
  only: valueOf('--only', '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  help: has('--help') || has('-h'),
};

const ESC = String.fromCharCode(27) + '[';
const tty = process.stdout.isTTY;
const paint = (code) => (s) => (tty ? ESC + code + 'm' + s + ESC + '0m' : s);
const c = {
  b: paint('1'),
  dim: paint('2'),
  g: paint('32'),
  y: paint('33'),
  r: paint('31'),
};

if (opts.help) {
  console.log(`
${c.b('drupal-source-components')} - install the Source component library

  ${c.b('npx drupal-source-components')}            install into the current project
  npx drupal-source-components ../my-app   install into another directory

Options
  --target <dir>   project to install into (default: current directory)
  --only a,b,c     install only these components
  --force          overwrite components that already exist
  --no-theme       skip merging the theme tokens into global CSS
  --dry-run        report what would change, write nothing
  -h, --help       show this
`);
  process.exit(0);
}

const fail = (msg, hint) => {
  console.error('\n' + c.r('x') + ' ' + msg);
  if (hint) console.error('  ' + c.dim(hint));
  process.exit(1);
};

/* --------------------------------------------- validate the target project */
const pkgPath = path.join(opts.target, 'package.json');
if (!fs.existsSync(pkgPath)) {
  fail(
    'No package.json in ' + opts.target,
    'Run this from inside a Canvas / Nebula project, or pass --target <dir>.',
  );
}
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };

const cfgPath = path.join(opts.target, 'canvas.config.json');
const isCanvas =
  fs.existsSync(cfgPath) ||
  'drupal-canvas' in allDeps ||
  '@drupal-canvas/cli' in allDeps;
if (!isCanvas) {
  fail(
    opts.target + ' does not look like a Canvas / Nebula project',
    'Expected canvas.config.json, or drupal-canvas in package.json dependencies.',
  );
}

const cfg = fs.existsSync(cfgPath)
  ? JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
  : {};
const componentDir = path.join(opts.target, cfg.componentDir ?? 'src/components');
const globalCssPath = path.join(
  opts.target,
  cfg.globalCssPath ?? 'src/global.css',
);

/* ------------------------------------------------------ collect components */
const srcComponents = path.join(SRC_ROOT, 'src/components');
let names = fs
  .readdirSync(srcComponents)
  .filter((n) => fs.existsSync(path.join(srcComponents, n, 'component.yml')))
  .sort();

if (opts.only.length) {
  const unknown = opts.only.filter((n) => !names.includes(n));
  if (unknown.length) fail('Unknown component(s): ' + unknown.join(', '));
  names = opts.only;
}

console.log('\n' + c.b('Drupal Source components'));
console.log('  from  ' + c.dim(SRC_ROOT));
console.log('  into  ' + c.dim(opts.target));
if (opts.dryRun) console.log('  ' + c.y('dry run - nothing will be written'));
console.log('');

/* ---------------------------------------------------------------- copy them */
const installed = [];
const skipped = [];
const overwritten = [];

for (const name of names) {
  const dest = path.join(componentDir, name);
  const exists = fs.existsSync(dest);
  if (exists && !opts.force) {
    skipped.push(name);
    continue;
  }
  if (!opts.dryRun) {
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(path.join(srcComponents, name))) {
      fs.copyFileSync(path.join(srcComponents, name, f), path.join(dest, f));
    }
  }
  (exists ? overwritten : installed).push(name);
}

const plural = (n) => (n === 1 ? '' : 's');
console.log(
  '  ' + c.g('+') + ' ' + installed.length + ' component' + plural(installed.length) + ' installed',
);
if (overwritten.length) {
  console.log('  ' + c.y('~') + ' ' + overwritten.length + ' overwritten (--force)');
}
if (skipped.length) {
  console.log(
    '  ' + c.y('=') + ' ' + skipped.length + ' already present, left alone ' + c.dim('(--force to replace)'),
  );
}

/* ------------------------------------------------------------ theme tokens */
if (!opts.noTheme) {
  const themeSrc = fs.readFileSync(
    path.join(SRC_ROOT, 'src/global.css'),
    'utf8',
  );
  // Everything from the first @theme block onward is the palette contract.
  const block =
    START + '\n' + themeSrc.slice(themeSrc.indexOf('@theme')).trim() + '\n' + END + '\n';

  if (!fs.existsSync(globalCssPath)) {
    if (!opts.dryRun) {
      fs.mkdirSync(path.dirname(globalCssPath), { recursive: true });
      fs.writeFileSync(globalCssPath, "@import 'tailwindcss';\n\n" + block);
    }
    console.log(
      '  ' + c.g('+') + ' theme tokens written to ' + c.dim(path.relative(opts.target, globalCssPath)),
    );
  } else {
    const existing = fs.readFileSync(globalCssPath, 'utf8');
    const s = existing.indexOf(START);
    const e = existing.indexOf(END);
    const next =
      s > -1 && e > s
        ? existing.slice(0, s) + block + existing.slice(e + END.length).replace(/^\n/, '')
        : existing.trimEnd() + '\n\n' + block;
    if (!opts.dryRun) fs.writeFileSync(globalCssPath, next);
    console.log(
      '  ' + c.g('+') + ' theme tokens ' + (s > -1 ? 'updated in ' : 'appended to ') + c.dim(path.relative(opts.target, globalCssPath)),
    );
  }
}

/* ------------------------------------------------------------- dependencies */
const missing = REQUIRED_DEPS.filter((d) => !(d in allDeps));
if (missing.length) {
  console.log('\n  ' + c.y('!') + ' missing dependencies: ' + missing.join(', '));
  console.log('    ' + c.dim('npm install ' + missing.join(' ')));
}

/* -------------------------------------------------------------- next steps */
console.log('\n' + c.b('Next'));
console.log('  npm run dev        ' + c.dim('preview every component in Workbench'));
console.log('  npx canvas push    ' + c.dim('publish them to your Canvas site'));
console.log('');
