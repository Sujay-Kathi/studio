import type { SVGProps } from "react";

export const SparkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z" />
    <path d="M12 12l-2 3h4l-2 3" />
  </svg>
);
