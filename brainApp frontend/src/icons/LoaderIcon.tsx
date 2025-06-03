export const LoaderIcon = ({ size = "size-4" }: { size?: string }) => {
  return (
    <>
      <svg viewBox="0 0 120 30" className={`${size} w-10 `}>
        <circle cx="30" cy="15" r="10" fill="currentColor">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0s"
            repeatCount="indefinite"
            values="15;5;15"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
        <circle cx="60" cy="15" r="10" fill="currentColor">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0.2s"
            repeatCount="indefinite"
            values="15;5;15"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
        <circle cx="90" cy="15" r="10" fill="currentColor">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0.4s"
            repeatCount="indefinite"
            values="15;5;15"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
      </svg>
    </>
  );
};
