import styles from "./Button.module.css";

type ButtonVariant = "primary" | "accent";

type ButtonType = "submit" | "button";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  type: ButtonType;
}

export const Button = ({ title, variant, type }: ButtonProps) => {
  return <button>{title}</button>;
};
