import styles from "./Button.module.css";

type ButtonVariant = "primary" | "accent";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
}

export const Button = ({ title, variant }: ButtonProps) => {
  return <button>{title}</button>;
};
