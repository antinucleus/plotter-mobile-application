import { AxisPosition } from '@/features/types';
import { axios } from '@/lib';

export const getMachinePosition = async () => {
  try {
    const { status, data } = await axios.get<AxisPosition>('/machine/coordinates');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
