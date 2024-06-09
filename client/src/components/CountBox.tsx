import { FC } from "react";

interface ICountBoxProps {
  title: string;
  value: string | number;
}

const CountBox: FC<ICountBoxProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <p className="text-white font-bold text-lg py-4 px-2 bg-zinc-800 w-full text-center rounded-t">{value}</p>
      <p className="text-zinc-400 bg-zinc-700 p-2 font-bold w-full text-center rounded-b">{title}</p>
    </div>
  );
};

export default CountBox;
