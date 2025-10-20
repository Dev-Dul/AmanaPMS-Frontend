/* Feature icons (SVG React components) */
function IconTicket(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="2"
        y="12"
        width="60"
        height="40"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 20h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 28h44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="48"
        cy="32"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconPayment(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="6"
        y="14"
        width="52"
        height="36"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="20"
        width="28"
        height="8"
        rx="1"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M18 34h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 28v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="46" cy="22" r="3" fill="currentColor" />
    </svg>
  );
}

function IconHistory(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M32 16v18l10 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12a1 1 0 0 0-2 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 32a22 22 0 1 0 5-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconVerify(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="8"
        y="10"
        width="48"
        height="36"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 26h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 34h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 34l6 6 10-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconControl(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="6"
        y="16"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="38"
        y="28"
        width="20"
        height="12"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M26 26h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 40h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="26" r="2" fill="currentColor" />
      <circle cx="50" cy="34" r="2" fill="currentColor" />
    </svg>
  );
}

function IconTracking(props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      aria-hidden="true"
      {...props}>
      <path
        d="M32 6c8 0 14 6 14 14 0 9-14 26-14 26s-14-17-14-26C18 12 24 6 32 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="32" cy="20" r="4" fill="currentColor" />
      <path
        d="M8 54c6-10 16-16 24-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M56 54c-6-10-16-16-24-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}


export { IconTicket, IconControl, IconHistory, IconPayment, IconTracking, IconVerify };