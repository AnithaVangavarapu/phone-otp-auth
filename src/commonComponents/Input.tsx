import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface ClassNamesProps {
  label?: string;
  input?: string;
  div?: string;
}
interface InputProps {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label?: string;
  classNames?: ClassNamesProps;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  label,
  classNames,
  maxLength,
}: InputProps) => {
  return (
    <div className={twMerge(clsx("", classNames?.div))}>
      <label className={twMerge(clsx("", classNames?.label))}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={twMerge(clsx("", classNames?.input))}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
