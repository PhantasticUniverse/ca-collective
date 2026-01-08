/**
 * Basic tests for the CA engine.
 */

import { describe, test, expect } from 'bun:test';
import { createGrid, initializeGrid, step, countAlive } from '../src/engine/core';
import { lifelike } from '../src/engine/rules';
import type { Rule } from '../src/engine/types';

describe('Grid', () => {
  test('createGrid initializes with zeros', () => {
    const grid = createGrid(10, 10);
    expect(grid.width).toBe(10);
    expect(grid.height).toBe(10);
    expect(grid.cells.length).toBe(100);
    expect(countAlive(grid)).toBe(0);
  });

  test('initializeGrid with single creates center cell', () => {
    const grid = createGrid(10, 10);
    initializeGrid(grid, 'single');
    expect(countAlive(grid)).toBe(1);
    expect(grid.cells[5 * 10 + 5]).toBe(1);
  });

  test('initializeGrid with random respects density', () => {
    const grid = createGrid(100, 100);
    initializeGrid(grid, 'random', 0.5);
    const alive = countAlive(grid);
    expect(alive).toBeGreaterThan(4000);
    expect(alive).toBeLessThan(6000);
  });
});

describe('Rules', () => {
  test('static rule preserves state', () => {
    const staticRule: Rule = {
      name: 'static',
      states: 2,
      neighborhood: 'moore',
      transition: (center) => center,
    };
    
    const grid = createGrid(10, 10);
    initializeGrid(grid, 'random', 0.5);
    const before = countAlive(grid);
    
    const after = step(grid, staticRule, 'wrap');
    expect(countAlive(after)).toBe(before);
  });

  test('lifelike helper creates correct transitions', () => {
    const transition = lifelike([3], [2, 3]);
    
    expect(transition(0, [1, 1, 1, 0, 0, 0, 0, 0])).toBe(1);
    expect(transition(0, [1, 1, 0, 0, 0, 0, 0, 0])).toBe(0);
    expect(transition(1, [1, 1, 0, 0, 0, 0, 0, 0])).toBe(1);
    expect(transition(1, [1, 1, 1, 1, 0, 0, 0, 0])).toBe(0);
  });
});

describe('Simulation', () => {
  test('step advances generation', () => {
    const rule: Rule = {
      name: 'test',
      states: 2,
      neighborhood: 'moore',
      transition: (center) => center,
    };
    
    const grid = createGrid(10, 10);
    expect(grid.generation).toBe(0);
    
    const next = step(grid, rule, 'wrap');
    expect(next.generation).toBe(1);
  });
});
