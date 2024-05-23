import { Direction, PenPosition, State } from '@/features/types';
import { axios } from '@/lib';

type Response = {
  autoHoming: State; // yes, no
  startPlotting: State; // yes, no
  manuelControl: State; // yes, no
  penPosition: PenPosition; // up, down, none
  isMovingX: State; // yes, no
  isMovingY: State; // yes, no
  targetDistanceX: number;
  targetDistanceY: number;
  direction: Direction; // +, -, none
};

export const getStatus = async () => {
  try {
    const { status, data } = await axios.get<Response>('/machine/status');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
