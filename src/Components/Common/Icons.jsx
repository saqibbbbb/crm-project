const base = "w-[18px] h-[18px]";

export const IconDashboard = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
    <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
    <rect x="3.5" y="15.5" width="7" height="5" rx="1.5" />
  </svg>
);

export const IconUsers = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3.5 20c0-3.31 2.46-6 5.5-6s5.5 2.69 5.5 6" />
    <circle cx="17" cy="8.5" r="2.5" />
    <path d="M15.5 14.25c2.53.3 4.5 2.66 4.5 5.75" />
  </svg>
);

export const IconOrders = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <path d="M4 7.5 12 3.5l8 4v9L12 20.5l-8-4Z" />
    <path d="M4 7.5 12 11.5l8-4" />
    <path d="M12 11.5v9" />
  </svg>
);

export const IconLogout = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <path d="M9 20H5.5A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4H9" />
    <path d="M15.5 16 20 12l-4.5-4" />
    <path d="M20 12H9" />
  </svg>
);

export const IconChevronLeft = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <path d="M15 5 8 12l7 7" />
  </svg>
);

export const IconSun = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5" />
    <path d="M12 19v2.5" />
    <path d="M4.5 4.5l1.8 1.8" />
    <path d="M17.7 17.7l1.8 1.8" />
    <path d="M2.5 12h2.5" />
    <path d="M19 12h2.5" />
    <path d="M4.5 19.5l1.8-1.8" />
    <path d="M17.7 6.3l1.8-1.8" />
  </svg>
);

export const IconMoon = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export const IconRupee = ({ className = base }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
    <path d="M6 4h12" />
    <path d="M6 8h12" />
    <path d="M6 4a6 4 0 0 1 0 8h-.5H6l8 8" />
  </svg>
);
