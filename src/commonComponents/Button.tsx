import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface ButtonProps {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  classname?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  classname,
  onClick,
  disable,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(clsx("border rounded-md text-sm", classname))}
      onClick={onClick}
      disabled={disable}
    >
      {label}
    </button>
  );
};

export default Button;
