import React, { ReactNode } from "react";

type Variant = "primary" | "secondary";

interface Props {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
}

export default function Button({
  children,
  onPress,
  disabled,
  variant = "secondary",
}: Props) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onPress}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
