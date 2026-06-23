import { toast, type ToastOptions } from 'react-toastify';

const defaultConfig: ToastOptions = {
  position: 'top-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export function notifySuccess(message: string = 'Успешная отправка!') {
  return toast(message, {
    ...defaultConfig,
    autoClose: 3000,
    className: 'bg-green-50 text-green-800 border border-green-200',
    type: 'success',
  });
}

export function notifyLoading(message: string = 'Обработка данных...') {
  return toast(message, {
    ...defaultConfig,
    autoClose: false,
    className: 'bg-blue-50 text-blue-800 border border-blue-200',
  });
}

export function notifyError(message: string = 'Произошла ошибка!') {
  return toast(message, {
    ...defaultConfig,
    autoClose: 3000,
    className: 'bg-red-50 text-red-800 border border-red-200',
    type: 'error',
  });
}
