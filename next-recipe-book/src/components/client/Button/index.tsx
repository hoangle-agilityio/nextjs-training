interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  title,
  className = "bg-button-primary text-white py-2 px-5 w-full rounded-full",
  onClick,
}: ButtonProps) => (
  <button className={className} onClick={onClick}>
    {title}
  </button>
);

export default Button;
