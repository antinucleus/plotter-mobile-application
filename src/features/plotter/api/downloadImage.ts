import { axios } from '@/lib';

export const downloadImage = async () => {
  try {
    const { status, data } = await axios.get('/public/result.svg');

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
