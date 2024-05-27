import { axios } from '@/lib';

export const getGcode = async () => {
  try {
    const { status, data } = await axios.get('/media/gcode/get');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
