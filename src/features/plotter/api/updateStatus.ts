import { Direction, DriveMode, PenPosition, State, StatusResponse } from '@/features/types';
import { axios } from '@/lib';

type Parameters = {
  autoHoming?: State; // yes, no
  startPlotting?: State; // yes, no
  manuelControl?: State; // yes, no
  penPosition?: PenPosition; // up, down
  isMovingX?: State; // yes, no
  isMovingY?: State; // yes, no
  targetDistanceX?: number;
  targetDistanceY?: number;
  direction?: Direction; // +, -
  driveMode?: DriveMode;
};

export const updateStatus = async (parameters: Parameters) => {
  try {
    const { status, data } = await axios.post<StatusResponse>('/machine/status', { ...parameters });

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
