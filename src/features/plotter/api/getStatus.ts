import { StatusResponse } from '@/features/types';
import { axios } from '@/lib';

export const getStatus = async () => {
  try {
    const { status, data } = await axios.get<StatusResponse>('/machine/status');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
