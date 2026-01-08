/**
 * Core type definitions for the cellular automaton engine.
 * 
 * These are starting points. The collective may extend, modify, 
 * or completely reimagine them as exploration demands.
 */

export interface Grid {
  width: number;
  height: number;
  cells: Uint8Array;  // Flat array, row-major: index = y * width + x
  generation: number;
}

export type NeighborhoodType = 'moore' | 'vonNeumann' | 'hexagonal';

export interface Rule {
  name: string;
  states: number;
  neighborhood: NeighborhoodType;
  transition: TransitionFunction;
}

/**
 * The transition function receives:
 * - center: the current state of the cell
 * - neighbors: array of neighbor states (order depends on neighborhood type)
 * 
 * Returns: the new state of the cell
 */
export type TransitionFunction = (center: number, neighbors: number[]) => number;

export type InitialCondition = 'random' | 'single' | 'empty' | Uint8Array;
export type BoundaryCondition = 'wrap' | 'dead' | 'alive';

export interface SimulationConfig {
  width: number;
  height: number;
  rule: Rule;
  initialCondition: InitialCondition;
  initialDensity?: number;  // For 'random', probability of alive (default 0.3)
  steps: number;
  boundaryCondition: BoundaryCondition;
  seed?: number;  // For reproducibility
}

export interface SimulationResult {
  finalGrid: Grid;
  history: Grid[];  // Optional: store intermediate states
  metrics: SimulationMetrics;
}

export interface SimulationMetrics {
  finalDensity: number;
  populationHistory: number[];
  generationsRun: number;
}
