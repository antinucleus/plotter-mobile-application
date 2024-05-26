import { axios } from '@/lib';

type Parameters = {
  image: FormData;
};

export const uploadImage = async ({ image }: Parameters) => {
  try {
    const { status, data } = await axios.post<string>('/media/image', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
