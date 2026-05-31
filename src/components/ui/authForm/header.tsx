import Image from 'next/image';

interface Props {
  title: string;
  description: string;
}

export const Header = (props: Props) => {
  const { description, title } = props;
  return (
    <div className="text-center mb-4">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center shadow-lg">
          <Image src="/logo.svg" alt="Русская кухня" width={48} height={48} />
        </div>
      </div>
      <h1 className="text-3xl mb-2 font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
