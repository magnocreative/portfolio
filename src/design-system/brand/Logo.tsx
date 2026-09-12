/**
 * The Magno Creative mark: two mountains forming an M, peaks left as negative
 * space.
 *
 * The two fills are tokens rather than the brand hex values, for one reason.
 * In light the tokens resolve to the brand colours exactly (#4f729a and
 * #7297b7). In dark they lift one step up the blue ramp, because the deep
 * peak against the dark ground measures 3.85:1 and the mark would go soft.
 * Reversed artwork is ordinary brand practice; this is that practice
 * expressed as tokens so it happens automatically rather than by remembering
 * to swap files.
 */
export function Logo({
  className = "",
  title = "Magno Creative",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 270.68 203.36"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <path
        fill="var(--mark-light)"
        d="M270.37,197.9L181.13,1.16c-.7-1.54-2.88-1.54-3.58-.01l-36.46,79.22c-.49,1.07-.5,2.31-.02,3.39l22.18,49.68c.39.88,1.65.87,2.03-.01l12.27-28.61c.7-1.55,2.9-1.55,3.59,0l43.73,97.39c.32.71,1.02,1.16,1.8,1.16h39.03c3.45,0,5.85-2.81,4.66-5.46ZM186.07,54.43l-6.67,7.6-7.2-7.6-13.33,12.52,20.53-45.21,20.53,45.21-13.87-12.52Z"
      />
      <path
        fill="var(--mark-deep)"
        d="M182.76,197.89L93.53,1.15c-.38-.84-1.21-1.21-1.99-1.13-.79-.08-1.61.29-1.99,1.13L.31,197.89c-1.19,2.65,1.21,5.46,4.66,5.46h39.03c.78,0,1.48-.46,1.8-1.16l43.73-97.39c.38-.85,1.22-1.22,2.01-1.13.79-.08,1.63.28,2.01,1.13l43.73,97.39c.32.71,1.02,1.16,1.8,1.16h39.03c3.45,0,5.85-2.81,4.66-5.46ZM98.23,54.47l-6.69,7.63-7.23-7.63-13.39,12.58,20.62-45.4,20.62,45.4-13.92-12.58Z"
      />
    </svg>
  );
}
