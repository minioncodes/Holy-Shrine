export function Icon({ name }: { name: "leaf" | "shield" | "sparkle" | "people" | "gift" | "truck" }) {
  const common = "h-5 w-5";
  switch (name) {
    case "leaf":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 4C12 4 6 8 4 20c8-2 12-8 12-12 0 8-4 12-12 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l7 4v6c0 5-3 8-7 8s-7-3-7-8V7l7-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 4.5L18 8l-4.8 1.5L12 14l-1.2-4.5L6 8l4.8-1.5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M5 14l.8 3L9 18l-3.2 1-.8 3-.8-3L1 18l3.2-1L5 14Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "people":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gift":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 12v8H4v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7h20v5H2V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 7v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M12 7c-2 0-4-1-4-3 0-1.1.9-2 2-2 2 0 3 3 3 5ZM12 7c2 0 4-1 4-3 0-1.1-.9-2-2-2-2 0-3 3-3 5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "truck":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h11v11H3V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14 10h4l3 3v4h-7v-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M7.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
