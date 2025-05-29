export const LockIcon = ({ size = "size-4" }: { size?: string }) => {
  return (
    <>
      <svg
        aria-hidden="true"
        role="graphics-symbol"
        viewBox="0 0 20 20"
        stroke="currentColor"
        className={size}
      >
        <path d="M6 5.95a4 4 0 1 1 8 0v1.433a2.426 2.426 0 0 1 2.025 2.392v5.4A2.425 2.425 0 0 1 13.6 17.6H6.4a2.425 2.425 0 0 1-2.425-2.425v-5.4c0-1.203.876-2.201 2.025-2.392zm6.75 1.4v-1.4a2.75 2.75 0 1 0-5.5 0v1.4zm-2.2 5.458a1.35 1.35 0 1 0-1.1 0v1.242a.55.55 0 0 0 1.1 0z"></path>
      </svg>
    </>
  );
};
