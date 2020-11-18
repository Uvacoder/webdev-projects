import React from "react";
import { VerticalSpacer } from "./Spacer";

type Resource = {
  title: string;
  url: string;
};

interface Props {
  title: string;
  children: React.ReactNode;
  resources?: Resource[];
}

export default function Info({ title, children, resources }: Props) {
  return (
    <section className="block">
      <h2>{title}</h2>
      <VerticalSpacer size={24} />
      <p>{children}</p>
      {resources && resources.length > 0 && (
        <>
          <VerticalSpacer size={24} />
          <span className="label">RESOURCES</span>
          <VerticalSpacer size={12} />
          <ul>
            {resources.map(({ title, url }, index) => (
              <li key={index}>
                <a href={url}>{title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
