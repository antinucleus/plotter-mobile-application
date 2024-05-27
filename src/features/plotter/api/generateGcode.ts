import { axios } from '@/lib';

export const generateGcode = async () => {
  try {
    const { status, data } = await axios.get('/media/gcode/generate');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
