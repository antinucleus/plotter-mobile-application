import { OptionalGcodeConfigInitialValues } from '@/features/types';
import { axios } from '@/lib';

export const updateGcodeConfig = async (parameters: OptionalGcodeConfigInitialValues) => {
  try {
    const { status, data } = await axios.post('/gcode/config', {
      ...parameters,
      sampleCount: Number(parameters.sampleCount),
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
