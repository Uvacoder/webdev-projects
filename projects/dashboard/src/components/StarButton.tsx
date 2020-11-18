import React, { useState } from "react";
import Button from "./Button";
import Star from "./icons/Star";
import { HorizontalSpacer } from "./Spacer";

export default function StarButton() {
  const [starred, setStarred] = useState(false);

  return (
    <Button
      onPress={() => {
        setStarred(!starred);
      }}
    >
      <Star
        fill={starred ? "#f4c622" : "white"}
        stroke={starred ? "#f4c622" : "#becada"}
      />
      <HorizontalSpacer size={8} />
      {starred ? "Unwatch" : "Watch"}
    </Button>
  );
}
