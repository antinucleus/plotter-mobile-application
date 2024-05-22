import { axios } from '@/lib';

type Response = {
  isDeviceConnected: boolean;
};

export const checkDevice = async () => {
  try {
    const { status, data } = await axios.get<Response>('/check');

    if (status === 200) {
      return data.isDeviceConnected;
    }
  } catch (error) {
    console.log('Error occured:', error);
    return null;
  }
};
