import { PenPosition } from '@/features/types';
import { axios } from '@/lib';

type Parameters = {
  penPosition: PenPosition;
};

export const movePen = async ({ penPosition }: Parameters) => {
  try {
    const { status, data } = await axios.post<string>('/machine/pen', { penPosition });

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
