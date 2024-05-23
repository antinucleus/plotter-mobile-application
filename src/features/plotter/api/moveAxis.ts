import { Direction, State } from '@/features/types';
import { axios } from '@/lib';

type Parameters = {
  direction: Direction;
  isMovingX: State;
  isMovingY: State;
  targetDistanceX: number;
  targetDistanceY: number;
};

export const moveAxis = async (params: Parameters) => {
  try {
    const { status, data } = await axios.post<string>('/machine/axis', { ...params });

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
