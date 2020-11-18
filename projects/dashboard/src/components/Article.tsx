import React from "react";
import { HorizontalSpacer, VerticalSpacer } from "./Spacer";

interface Props {
  title: string;
  summary: string;
  author: string;
  formattedDate: string;
  url: string;
  image?: string;
}

export default function Article({
  title,
  summary,
  author,
  formattedDate,
  url,
  image,
}: Props) {
  return (
    <a className="row" href={url}>
      <div className="column">
        <h3>{title}</h3>
        <VerticalSpacer size={8} />
        <p>{summary}</p>
        <VerticalSpacer size={8} />
        <p className="row">
          {author}
          <VerticalSpacer size={24} />
          {formattedDate}
        </p>
      </div>
      {image && (
        <>
          <HorizontalSpacer size={32} />
          <HorizontalSpacer />
          <img
            className="thumbnail"
            style={{ width: "115px", height: "115px" }}
            src={image}
          ></img>
        </>
      )}
    </a>
  );
}
