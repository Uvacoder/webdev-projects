import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onPress: () => void;
}

export default function Button({ children, onPress }: Props) {
  return (
    <button className="button" onClick={onPress}>
      {children}
    </button>
  );
}
