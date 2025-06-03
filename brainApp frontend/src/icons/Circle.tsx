export const CircleIcon = ({
  size = "size-4",
  color,
}: {
  size?: string;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 24 24"
      stroke={"#D7DADF"}
      strokeWidth={1}
      className={size}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
