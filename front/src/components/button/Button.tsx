import styles from "./Button.module.css";

type ButtonVariant = "primary" | "accent" | "accordeon";

type ButtonType = "submit" | "button";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  type: ButtonType;
  disabled?: boolean;
  className: string;
  onClick?: () => void;
}

export const Button = ({ title, variant, type, disabled, className, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[styles.button, styles[variant as keyof typeof styles], disabled && styles.disabled, className]
        .filter(Boolean)
        .join(" ")}
    >
      {title}
    </button>
  );
};
