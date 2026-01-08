/**
 * Simulate command
 * 
 * Run: bun run simulate
 * 
 * The primary feedback loop. Run it. See what happens.
 */

import { simulate } from '../engine/core';
import { currentRule, getRule, listRules } from '../engine/rules';
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

// Rule selection: --rule [name] or use currentRule
const ruleName = getStringArg('rule', '');
let selectedRule = currentRule;

if (ruleName) {
  const found = getRule(ruleName);
  if (found) {
    selectedRule = found;
  } else {
    console.error(`Error: Unknown rule "${ruleName}"`);
    console.error(`Available rules: ${listRules().join(', ')}`);
    process.exit(1);
  }
}

const config: SimulationConfig = {
  width: getArg('width', 100),
  height: getArg('height', 100),
  steps: getArg('steps', 200),
  rule: selectedRule,
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

// Temporal analysis — Epoch
console.log('\n' + '─'.repeat(60));
console.log('TEMPORAL DYNAMICS');
console.log('─'.repeat(60));
const pop = result.metrics.populationHistory;
const totalCells = config.width * config.height;

// Population at key intervals
const intervals = [0, 10, 25, 50, 100, 200, Math.min(500, config.steps)].filter(i => i <= config.steps);
console.log('Population over time:');
for (const t of intervals) {
  const p = pop[t];
  const pct = ((p / totalCells) * 100).toFixed(1);
  console.log(`  t=${t.toString().padStart(4)}: ${p.toString().padStart(5)} cells (${pct}%)`);
}

// Stabilization detection: find when population variance becomes low
const windowSize = 20;
let stableAt = -1;
for (let i = windowSize; i < pop.length; i++) {
  const window = pop.slice(i - windowSize, i);
  const mean = window.reduce((a, b) => a + b, 0) / windowSize;
  const variance = window.reduce((a, b) => a + (b - mean) ** 2, 0) / windowSize;
  const cv = Math.sqrt(variance) / mean; // coefficient of variation
  if (cv < 0.02) { // < 2% variation = stable
    stableAt = i - windowSize;
    break;
  }
}
if (stableAt > 0) {
  console.log(`Stabilization: ~step ${stableAt} (variance < 2%)`);
} else {
  console.log('Stabilization: not detected (high variance throughout)');
}

// Initial decay rate (first 50 steps)
const early = pop.slice(0, Math.min(51, pop.length));
const earlyDecay = early.length > 1 ? (early[0] - early[early.length - 1]) / early[0] : 0;
console.log(`Early decay (0-50): ${(earlyDecay * 100).toFixed(1)}% of initial population`);

// Late activity (variance in last 50 steps)
const lateWindow = pop.slice(-Math.min(50, pop.length));
const lateMean = lateWindow.reduce((a, b) => a + b, 0) / lateWindow.length;
const lateVariance = lateWindow.reduce((a, b) => a + (b - lateMean) ** 2, 0) / lateWindow.length;
const lateStdDev = Math.sqrt(lateVariance);
console.log(`Late fluctuation: mean=${lateMean.toFixed(0)}, stdDev=${lateStdDev.toFixed(1)}`)

// Save image
const filename = generateFilename(config.rule.name, researcher || undefined);
console.log('\n' + '─'.repeat(60));
console.log(`Saving snapshot: ${filename}`);
await renderToPng(result.finalGrid, filename);
console.log('Done.');
console.log('═'.repeat(60));
