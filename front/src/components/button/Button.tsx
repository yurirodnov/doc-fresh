import styles from "./Button.module.css";

type ButtonVariant = "primary" | "accent";

type ButtonType = "submit" | "button";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  type: ButtonType;
  disabled: boolean;
  onClick?: () => void;
}

export const Button = ({ title, variant, type, disabled, onClick }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};
