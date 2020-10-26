import React from "react";
import Spacer from "./Spacer";

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
        <Spacer size={8} />
        <p>{summary}</p>
        <Spacer size={8} />
        <p className="row">
          {author}
          <Spacer size={24} />
          {formattedDate}
        </p>
      </div>
      {image && (
        <>
          <Spacer size={32} />
          <Spacer />
          <img
            className="thumbnail"
            style={{ flex: "0 0 115px", height: "115px" }}
            src={image}
          ></img>
        </>
      )}
    </a>
  );
}
