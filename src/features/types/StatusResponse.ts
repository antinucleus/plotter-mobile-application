import { Direction } from './Direction';
import { DriveMode } from './DriveMode';
import { PenPosition } from './PenPosition';
import { State } from './State';

export type StatusResponse = {
  autoHoming: State; // yes, no
  startPlotting: State; // yes, no
  manuelControl: State; // yes, no
  penPosition: PenPosition; // up, down
  isMovingX: State; // yes, no
  isMovingY: State; // yes, no
  targetDistanceX: number;
  targetDistanceY: number;
  direction: Direction; // +, -
  driveMode: DriveMode;
};
