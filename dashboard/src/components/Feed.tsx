import React, { Children, ReactNode } from "react";
import Spacer from "./Spacer";

interface Props {
  title: string;
  fallback?: ReactNode;
  children?: ReactNode;
}

export default function Feed({ title, fallback, children }: Props) {
  const childrenArray = Children.toArray(children);

  return (
    <section className="block">
      <h2>{title}</h2>
      <Spacer size={24} />
      {childrenArray.length > 0
        ? childrenArray.map((item, index, list) => (
            <>
              {item}
              {index < list.length - 1 && (
                <>
                  <Spacer size={32} />
                  <hr />
                  <Spacer size={24} />
                </>
              )}
            </>
          ))
        : fallback}
    </section>
  );
}
