import type { CSSProperties } from "react";

import type { ReactNode } from "@site/utilities/deps";

import { clsx, NextLink } from "@site/utilities/deps";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  color?: "primary" | "danger" | "light" | "dark" | "neon";
  size: "xs" | "sm" | "md";
  href?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

const colors = {
  primary: clsx("bg-primary-600 text-white hover:bg-primary-500 disabled:bg-primary-400"),
  danger: clsx("bg-danger-600 text-white hover:bg-danger-500 disabled:bg-danger-400"),
  dark: clsx("bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-700"),
  light: clsx("bg-gray-100 text-white hover:bg-gray-200 disabled:bg-gray-300"),
  neon: clsx("bg-[#dcff07] text-black hover:bg-[#c2e606] disabled:bg-[#a8cc05]"),
};

const sizes = {
  xs: clsx("px-2 py-1 text-xs"),
  sm: clsx("px-3 py-2 text-sm"),
  md: clsx("px-4 py-3 text-base"),
};

export function Button(props: Props) {
  // If custom className is provided and it contains color classes, don't apply default color
  const hasCustomColors =
    props.className &&
    (props.className.includes("bg-") || props.className.includes("text-") || props.className.includes("hover:bg-"));

  const colorClasses = props.color && !hasCustomColors ? colors[props.color] : "";

  if (props.href) {
    return (
      <NextLink
        href={props.href}
        className={clsx(
          "pointer-events-auto rounded-md leading-5 font-semibold",
          colorClasses,
          sizes[props.size],
          props.className,
        )}
        style={props.style}
      >
        {props.children}
      </NextLink>
    );
  }

  return (
    <button
      onClick={props.onClick}
      className={clsx(
        "pointer-events-auto rounded-md leading-5 font-semibold",
        colorClasses,
        sizes[props.size],
        props.className,
      )}
      disabled={props.disabled}
      type="button"
      style={props.style}
    >
      {props.children}
    </button>
  );
}
