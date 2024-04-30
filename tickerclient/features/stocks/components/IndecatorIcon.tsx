import Image, { ImageProps } from "next/image";
import React from "react";
import { ArrowUpIcon, ArrowDownIcon, EqualIcon } from "..";

type Props = {
  value: "less" | "more" | "equal" | null;
} & Omit<ImageProps, "src" | "alt">;

const IndecatorIcon = ({ value, ...props }: Props) => {

  if (value === "less") {
    return <Image {...props} alt={value} src={ArrowDownIcon} />;
  }
  if (value === "more") {
    return <Image {...props} alt={value} src={ArrowUpIcon} />;
  }
  if (value === "equal") {
    return <Image {...props} alt={value} src={EqualIcon} />;
  }
  return <></>;
};

export default IndecatorIcon;
