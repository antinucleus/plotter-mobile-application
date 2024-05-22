import Toast, { ToastType } from 'react-native-toast-message';

type Props = {
  type: ToastType;
  text1?: string;
  text2?: string;
};

export const useToast = () => {
  const showToast = (props: Props) =>
    Toast.show({
      ...props,
    });

  const hideToast = () => Toast.hide();

  return { hideToast, showToast };
};
