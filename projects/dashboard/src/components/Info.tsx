import React from "react";
import Spacer from "./Spacer";

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
      <Spacer size={24} />
      <p>{children}</p>
      {resources && resources.length > 0 && (
        <>
          <Spacer size={24} />
          <span className="label">RESOURCES</span>
          <Spacer size={12} />
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
