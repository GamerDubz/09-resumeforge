// Original mark for ResumeForge: an anvil struck by a forge spark, read equally
// as a nib catching light. Built from flat geometric shapes so it stays crisp
// from favicon scale (16px) up to a printed masthead (512px).
interface LogoProps {
  size?: number
  className?: string
  title?: string
}

export function Logo({ size = 24, className, title }: LogoProps) {
  const isDecorative = !title

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={isDecorative ? undefined : 'img'}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {/* anvil horn */}
      <path d="M2 18.5L7 13.5V18.5H2Z" fill="currentColor" />
      {/* anvil table */}
      <rect x="7" y="12.5" width="19" height="6" rx="1.4" fill="currentColor" />
      {/* waist */}
      <path d="M13 18.5H20L22 25.5H11L13 18.5Z" fill="currentColor" />
      {/* base */}
      <rect x="8.5" y="26" width="15" height="3" rx="1" fill="currentColor" />
      {/* forge spark */}
      <path
        d="M24.5 1L25.9 5.1L30 6.5L25.9 7.9L24.5 12L23.1 7.9L19 6.5L23.1 5.1L24.5 1Z"
        fill="currentColor"
      />
    </svg>
  )
}
