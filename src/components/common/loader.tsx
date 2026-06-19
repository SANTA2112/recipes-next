import { Header } from '@/components/ui/authForm/header';

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-red flex items-center justify-center z-50 select-none">
      <Header title="Пожалуйста подождите " description="Идет обработка данных" withAnimation />
    </div>
  );
};
