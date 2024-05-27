import { axios } from '@/lib';

type Parameters = {
  detailLevel: number;
};

export const convertImagetoSvg = async ({ detailLevel }: Parameters) => {
  try {
    const { status, data } = await axios.post('/media/image/generate', { detailLevel });

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
