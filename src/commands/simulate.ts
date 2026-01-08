/**
 * Simulate command
 * 
 * Run: bun run simulate
 * 
 * The primary feedback loop. Run it. See what happens.
 */

import { simulate } from '../engine/core';
import { currentRule } from '../engine/rules';
import { renderToPng, generateFilename } from '../visualization/renderer';
import { renderPreview, gridSummary } from '../visualization/ascii';
import { analyze } from '../analysis/metrics';
import type { SimulationConfig } from '../engine/types';

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name: string, defaultValue: number): number => {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) {
    return parseInt(args[index + 1], 10);
  }
  return defaultValue;
};

const getStringArg = (name: string, defaultValue: string): string => {
  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
};

// Configuration
const boundaryArg = getStringArg('boundary', 'wrap');
const boundary = ['wrap', 'dead', 'alive'].includes(boundaryArg)
  ? boundaryArg as 'wrap' | 'dead' | 'alive'
  : 'wrap';

const config: SimulationConfig = {
  width: getArg('width', 100),
  height: getArg('height', 100),
  steps: getArg('steps', 200),
  rule: currentRule,
  initialCondition: 'random',
  initialDensity: 0.3,
  boundaryCondition: boundary,
};

const researcher = getStringArg('researcher', '');

console.log('═'.repeat(60));
console.log('CELLULAR AUTOMATON SIMULATION');
console.log('═'.repeat(60));
console.log(`Rule: ${config.rule.name}`);
console.log(`Grid: ${config.width}×${config.height}`);
console.log(`Steps: ${config.steps}`);
console.log(`Neighborhood: ${config.rule.neighborhood}`);
console.log(`Boundary: ${config.boundaryCondition}`);
if (researcher) console.log(`Researcher: ${researcher}`);
console.log('─'.repeat(60));

// Run simulation
console.log('\nRunning simulation...');
const startTime = performance.now();
const result = simulate(config);
const elapsed = (performance.now() - startTime).toFixed(1);
console.log(`Completed in ${elapsed}ms`);

// Show results
console.log('\n' + '─'.repeat(60));
console.log('FINAL STATE');
console.log('─'.repeat(60));
console.log(gridSummary(result.finalGrid));

// ASCII preview
console.log('\nCenter preview:');
console.log(renderPreview(result.finalGrid, 30));

// Analysis
console.log('\n' + '─'.repeat(60));
console.log('ANALYSIS');
console.log('─'.repeat(60));
const analysis = analyze(result);
console.log(`Entropy: ${analysis.entropy.toFixed(4)}`);
console.log(`Activity: ${(analysis.activity * 100).toFixed(1)}%`);
console.log(`Symmetry: H=${analysis.symmetry.horizontal} V=${analysis.symmetry.vertical} R=${analysis.symmetry.rotational180}`);
if (analysis.periodicity.detected) {
  console.log(`Periodicity: period=${analysis.periodicity.period} (confidence: ${(analysis.periodicity.confidence * 100).toFixed(0)}%)`);
} else {
  console.log('Periodicity: not detected');
}

// Save image
const filename = generateFilename(config.rule.name, researcher || undefined);
console.log('\n' + '─'.repeat(60));
console.log(`Saving snapshot: ${filename}`);
await renderToPng(result.finalGrid, filename);
console.log('Done.');
console.log('═'.repeat(60));
