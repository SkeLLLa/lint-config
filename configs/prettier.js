/**
 * Shared Prettier configuration
 *
 * This configuration provides sensible defaults for code formatting
 * with additional plugins for enhanced functionality.
 */

function resolvePlugin(pluginName, fallback = pluginName) {
  try {
    // Try require.resolve first with paths from config location
    const path = require('path');
    const configDir = path.dirname(new URL(import.meta.url).pathname);
    const resolved = require.resolve(pluginName, { paths: [configDir, process.cwd()] });
    return resolved;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    try {
      // Try import.meta.resolve as fallback
      const resolved = import.meta.resolve(pluginName);
      // Strip file:// protocol if present to get absolute path
      return resolved.startsWith('file://') ? resolved.replace('file://', '') : resolved;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error2) {
      // Final fallback to simple string
      // VS Code will try to resolve this using its own logic
      console.warn(`Could not resolve ${pluginName}, falling back to string-based resolution`);
      return fallback;
    }
  }
}
export default {
  $schema: 'http://json.schemastore.org/prettierrc',
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  plugins: [
    resolvePlugin('prettier-plugin-packagejson'),
    resolvePlugin('prettier-plugin-jsdoc'),
    resolvePlugin('prettier-plugin-sort-json'),
    resolvePlugin('@ianvs/prettier-plugin-sort-imports'),
    resolvePlugin('prettier-plugin-sh'),
  ],
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '^[.]', // relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '6.0.2',
  jsonRecursiveSort: true,
};
