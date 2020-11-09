import React, { useMemo } from "react";
import { CSSProperties } from "react";

interface Props {
  size?: number;
}

export default function Spacer({ size }: Props) {
  const style: CSSProperties = useMemo(
    () => ({
      flex: typeof size === "number" ? `0 0 ${size}px` : `1 1 0%`,
    }),
    [size]
  );

  return <span style={style} />;
}
