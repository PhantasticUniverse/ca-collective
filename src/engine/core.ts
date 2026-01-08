/**
 * The cellular automaton engine.
 * 
 * Minimal but functional. Room to grow.
 */

import type { 
  Grid, 
  Rule, 
  SimulationConfig, 
  SimulationResult,
  NeighborhoodType,
  BoundaryCondition 
} from './types';

/**
 * Create an empty grid
 */
export function createGrid(width: number, height: number): Grid {
  return {
    width,
    height,
    cells: new Uint8Array(width * height),
    generation: 0
  };
}

/**
 * Initialize a grid based on the specified condition
 */
export function initializeGrid(
  grid: Grid, 
  condition: SimulationConfig['initialCondition'],
  density: number = 0.3
): void {
  if (condition === 'empty') {
    grid.cells.fill(0);
  } else if (condition === 'single') {
    grid.cells.fill(0);
    const centerX = Math.floor(grid.width / 2);
    const centerY = Math.floor(grid.height / 2);
    grid.cells[centerY * grid.width + centerX] = 1;
  } else if (condition === 'random') {
    for (let i = 0; i < grid.cells.length; i++) {
      grid.cells[i] = Math.random() < density ? 1 : 0;
    }
  } else if (condition instanceof Uint8Array) {
    grid.cells.set(condition);
  }
  grid.generation = 0;
}

/**
 * Get cell value with boundary handling
 */
function getCell(
  grid: Grid, 
  x: number, 
  y: number, 
  boundary: BoundaryCondition
): number {
  if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) {
    switch (boundary) {
      case 'wrap':
        x = ((x % grid.width) + grid.width) % grid.width;
        y = ((y % grid.height) + grid.height) % grid.height;
        break;
      case 'dead':
        return 0;
      case 'alive':
        return 1;
    }
  }
  return grid.cells[y * grid.width + x];
}

/**
 * Get neighbors for a cell based on neighborhood type
 */
function getNeighbors(
  grid: Grid,
  x: number,
  y: number,
  neighborhood: NeighborhoodType,
  boundary: BoundaryCondition
): number[] {
  if (neighborhood === 'moore') {
    // 8 neighbors: NW, N, NE, W, E, SW, S, SE
    return [
      getCell(grid, x - 1, y - 1, boundary),
      getCell(grid, x,     y - 1, boundary),
      getCell(grid, x + 1, y - 1, boundary),
      getCell(grid, x - 1, y,     boundary),
      getCell(grid, x + 1, y,     boundary),
      getCell(grid, x - 1, y + 1, boundary),
      getCell(grid, x,     y + 1, boundary),
      getCell(grid, x + 1, y + 1, boundary),
    ];
  } else {
    // von Neumann: 4 neighbors: N, W, E, S
    return [
      getCell(grid, x,     y - 1, boundary),
      getCell(grid, x - 1, y,     boundary),
      getCell(grid, x + 1, y,     boundary),
      getCell(grid, x,     y + 1, boundary),
    ];
  }
}

/**
 * Advance the grid by one generation
 */
export function step(
  grid: Grid, 
  rule: Rule, 
  boundary: BoundaryCondition
): Grid {
  const newCells = new Uint8Array(grid.cells.length);
  
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const index = y * grid.width + x;
      const center = grid.cells[index];
      const neighbors = getNeighbors(grid, x, y, rule.neighborhood, boundary);
      newCells[index] = rule.transition(center, neighbors);
    }
  }
  
  return {
    width: grid.width,
    height: grid.height,
    cells: newCells,
    generation: grid.generation + 1
  };
}

/**
 * Run a complete simulation
 */
export function simulate(config: SimulationConfig): SimulationResult {
  let grid = createGrid(config.width, config.height);
  initializeGrid(grid, config.initialCondition, config.initialDensity);
  
  const populationHistory: number[] = [countAlive(grid)];
  const history: Grid[] = [copyGrid(grid)];
  
  for (let i = 0; i < config.steps; i++) {
    grid = step(grid, config.rule, config.boundaryCondition);
    populationHistory.push(countAlive(grid));
    
    // Store history every 10 steps to save memory
    if (i % 10 === 0) {
      history.push(copyGrid(grid));
    }
  }
  
  return {
    finalGrid: grid,
    history,
    metrics: {
      finalDensity: countAlive(grid) / (grid.width * grid.height),
      populationHistory,
      generationsRun: config.steps
    }
  };
}

/**
 * Count alive cells (state > 0)
 */
export function countAlive(grid: Grid): number {
  let count = 0;
  for (let i = 0; i < grid.cells.length; i++) {
    if (grid.cells[i] > 0) count++;
  }
  return count;
}

/**
 * Create a deep copy of a grid
 */
export function copyGrid(grid: Grid): Grid {
  return {
    width: grid.width,
    height: grid.height,
    cells: new Uint8Array(grid.cells),
    generation: grid.generation
  };
}
