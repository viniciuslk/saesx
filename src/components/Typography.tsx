"use client";

import cn from "classnames";
import React from "react";

export interface TypographyProps {
  className?: string;
  as?: string | React.ElementType;
  asProps?: any;
  size?:
    | "xxxsmall"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "xxxlarge";

  color?: string
  weight?: "light" | "regular" | "semibold" | "bold";
  align?: "center" | "left" | "right" | "justify";
  whiteSpaceNoWrap?: boolean;
  letterCase?: "uppercase" | "lowercase" | "none";
}

export function Typography(
  typographyProps: React.PropsWithChildren<TypographyProps>
) {
  const {
    size = "body-1",
    color = "inherit",
    weight = "regular",
    align,
    children,
    className = "",
    whiteSpaceNoWrap,
    as,
    asProps,
  } = typographyProps;

  const classes = cn(className, color, {
    "text-xxxsmall": size === "xxxsmall",
    "text-xxsmall": size === "xxsmall",
    "text-xsmall": size === "xsmall",
    "text-small": size === "small",
    "text-medium": size === "medium",
    "text-large": size === "large",
    "text-xlarge": size === "xlarge",
    "text-xxlarge": size === "xxlarge",
    "text-xxxlarge": size === "xxxlarge",

    "font-semibold":
      weight === "bold" ||
      size === "large" ||
      size === "xlarge" ||
      size === "xxlarge" ||
      size === "xxxlarge" || weight === "semibold",

    "font-regular": weight === "regular",

    "text-center": align === "center",
    "text-right": align === "right",
    "text-left": align === "left",
    "text-justify": align === "justify",
    "whitespace-nowrap": whiteSpaceNoWrap,
  });

  if (size === "xxxlarge") {
    return <h1 className={classes}>{children}</h1>;
  }

  if (size === "xxlarge") {
    return <h2 className={classes}>{children}</h2>;
  }

  if (size === "xlarge") {
    return <h3 className={classes}>{children}</h3>;
  }

  if (size === "large") {
    return <h4 className={classes}>{children}</h4>;
  }

  if (as) {
    const Component = as;

    return (
      <Component {...asProps} className={classes}>
        {children}
      </Component>
    );
  }

  return <p className={classes}>{children}</p>;
}
