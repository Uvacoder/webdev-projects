import React, { useMemo } from "react";
import { CSSProperties } from "react";

interface Props {
  size?: number;
}

export function VerticalSpacer({ size }: Props) {
  const style: CSSProperties = useMemo(
    () =>
      typeof size === "number" ? { height: `${size}px` } : { flex: "1 1 0" },
    [size]
  );

  return <span style={style} />;
}

export function HorizontalSpacer({ size }: Props) {
  const style: CSSProperties = useMemo(
    () =>
      typeof size === "number" ? { width: `${size}px` } : { flex: "1 1 0" },
    [size]
  );

  return <span style={style} />;
}
