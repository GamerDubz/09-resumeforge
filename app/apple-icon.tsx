import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#7a1f2b',
          borderRadius: 36,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
          <path d="M4 20.5L9 15.5V20.5H4Z" fill="#f6f0e4" />
          <rect x="9" y="14.5" width="17" height="5.4" rx="1.2" fill="#f6f0e4" />
          <path d="M14.5 19.9H19.5L21.2 25.5H12.8L14.5 19.9Z" fill="#f6f0e4" />
          <rect x="10.5" y="25.8" width="12" height="2.6" rx="0.9" fill="#f6f0e4" />
          <path
            d="M24.5 3.5L25.6 6.9L29 8L25.6 9.1L24.5 12.5L23.4 9.1L20 8L23.4 6.9L24.5 3.5Z"
            fill="#f6f0e4"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
