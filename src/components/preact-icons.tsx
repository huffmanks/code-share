import type { JSX } from "preact/jsx-runtime";

export const LanguageIcon: Record<string, ({ style }: { style: JSX.CSSProperties }) => JSX.Element> = {
  css: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" style={style}>
      <path
        fill="currentColor"
        d="m8.76 1l10.055 112.883l45.118 12.58l45.244-12.626L119.24 1zm89.591 25.862l-3.347 37.605l.01.203l-.014.467v-.004l-2.378 26.294l-.262 2.336L64 101.607v.001l-.022.019l-28.311-7.888L33.75 72h13.883l.985 11.054l15.386 4.17l-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043l-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041l-.63-7.131L29.401 23h69.281z"
      />
    </svg>
  ),
  html: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" style={style}>
      <path
        fill="currentColor"
        d="m9.032 2l10.005 112.093l44.896 12.401l45.02-12.387L118.968 2zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471l-3.233 36.119l-.238 2.27L64 102.609v.002l-.034.018l-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939z"
      />
    </svg>
  ),
  python: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" style={style}>
      <path
        fill="currentColor"
        d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176c-5.014-.835-10.195-1.215-15.187-1.191c-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811c-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62m-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545c0-3.079 2.451-5.581 5.478-5.581c3.015 0 5.479 2.502 5.479 5.581c-.001 3.066-2.465 5.545-5.479 5.545m74.789 25.921C120.183 40.363 116.178 34 107.682 34H97v12.981C97 57.031 88.206 65 78.489 65H49.33C41.342 65 35 72.326 35 80.326v27.8c0 7.91 6.745 12.564 14.462 14.834c9.242 2.717 17.994 3.208 29.051 0C85.862 120.831 93 116.549 93 108.126V97H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66c3.047-9.145 2.916-17.799 0-29.529m-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547c0 3.076-2.451 5.579-5.479 5.579c-3.015 0-5.478-2.502-5.478-5.579c0-3.068 2.463-5.547 5.478-5.547"
      />
    </svg>
  ),
  regex: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" style={style}>
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M3.05 3.05a7 7 0 0 0 0 9.9a.5.5 0 0 1-.707.707a8 8 0 0 1 0-11.314a.5.5 0 1 1 .707.707m9.9-.707a.5.5 0 0 1 .707 0a8 8 0 0 1 0 11.314a.5.5 0 0 1-.707-.707a7 7 0 0 0 0-9.9a.5.5 0 0 1 0-.707M6 11a1 1 0 1 1-2 0a1 1 0 0 1 2 0m5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5L7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617z"
      />
    </svg>
  ),
  sh: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" style={style}>
      <path fill="none" d="M-143.76 4.24h119.53v119.53h-119.53z" />
      <path
        fill="currentColor"
        d="M109.01 28.64L71.28 6.24c-2.25-1.33-4.77-2-7.28-2s-5.03.67-7.28 2.01l-37.74 22.4c-4.5 2.67-7.28 7.61-7.28 12.96v44.8c0 5.35 2.77 10.29 7.28 12.96l37.73 22.4c2.25 1.34 4.76 2 7.28 2c2.51 0 5.03-.67 7.28-2l37.74-22.4c4.5-2.67 7.28-7.62 7.28-12.96V41.6c0-5.34-2.77-10.29-7.28-12.96M79.79 98.59l.06 3.22c0 .39-.25.83-.55.99l-1.91 1.1c-.3.15-.56-.03-.56-.42l-.03-3.17c-1.63.68-3.29.84-4.34.42c-.2-.08-.29-.37-.21-.71l.69-2.91c.06-.23.18-.46.34-.6c.06-.06.12-.1.18-.13c.11-.06.22-.07.31-.03c1.14.38 2.59.2 3.99-.5c1.78-.9 2.97-2.72 2.95-4.52c-.02-1.64-.9-2.31-3.05-2.33c-2.74.01-5.3-.53-5.34-4.57c-.03-3.32 1.69-6.78 4.43-8.96l-.03-3.25c0-.4.24-.84.55-1l1.85-1.18c.3-.15.56.04.56.43l.03 3.25c1.36-.54 2.54-.69 3.61-.44c.23.06.34.38.24.75l-.72 2.88c-.06.22-.18.44-.33.58a.8.8 0 0 1-.19.14c-.1.05-.19.06-.28.05c-.49-.11-1.65-.36-3.48.56c-1.92.97-2.59 2.64-2.58 3.88c.02 1.48.77 1.93 3.39 1.97c3.49.06 4.99 1.58 5.03 5.09c.05 3.44-1.79 7.15-4.61 9.41m19.78-5.41c0 .3-.04.58-.29.72l-9.54 5.8c-.25.15-.45.02-.45-.28v-2.46c0-.3.18-.46.43-.61l9.4-5.62c.25-.15.45-.02.45.28zm6.56-55.09l-35.7 22.05c-4.45 2.6-7.73 5.52-7.74 10.89v43.99c0 3.21 1.3 5.29 3.29 5.9c-.65.11-1.32.19-1.98.19c-2.09 0-4.15-.57-5.96-1.64l-37.73-22.4c-3.69-2.19-5.98-6.28-5.98-10.67V41.6c0-4.39 2.29-8.48 5.98-10.67l37.74-22.4c1.81-1.07 3.87-1.64 5.96-1.64s4.15.57 5.96 1.64l37.74 22.4c3.11 1.85 5.21 5.04 5.8 8.63c-1.27-2.67-4.09-3.39-7.38-1.47"
      />
    </svg>
  ),
  ts: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" style={style}>
      <path
        fill="currentColor"
        d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 0 1 7.82 4.5a20.6 20.6 0 0 1 3 4c0 .16-5.4 3.81-8.69 5.85c-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 0 0-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.6 4.6 0 0 0 .54 2.34c.83 1.73 2.38 2.76 7.24 4.86c8.95 3.85 12.78 6.39 15.16 10c2.66 4 3.25 10.46 1.45 15.24c-2 5.2-6.9 8.73-13.83 9.9a38.3 38.3 0 0 1-9.52-.1A23 23 0 0 1 80 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9 9 0 0 1 1.15-.73l4.6-2.64l3.59-2.08l.75 1.11a16.8 16.8 0 0 0 4.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 0 0 .69-6.92c-1-1.39-3-2.56-8.59-5c-6.45-2.78-9.23-4.5-11.77-7.24a16.5 16.5 0 0 1-3.43-6.25a25 25 0 0 1-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.7 31.7 0 0 1 9.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49 49 0 0 1 .14-5.16c.06-.08 10-.12 22-.1h21.81z"
      />
    </svg>
  ),
};

export const ButtonIcon: Record<string, ({ style }: { style?: JSX.CSSProperties }) => JSX.Element> = {
  az: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" style={style}>
      <g fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M20 9h22M20 19h22M20 29h22M20 39h22M6 29h6L6 39h6" />
        <path fill="currentColor" d="M11 9H7l-.7 7h5.4z" />
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m6 19l.3-3m5.7 3l-.3-3m0 0L11 9H7l-.7 7m5.4 0H6.3" />
      </g>
    </svg>
  ),
  azdown: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16l4 4l4-4m-4 4V4m13 4h-5m0 2V6.5a2.5 2.5 0 0 1 5 0V10m-5 4h5l-5 6h5" />
    </svg>
  ),
  azup: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 8l4-4l4 4M7 4v16M20 8h-5m0 2V6.5a2.5 2.5 0 0 1 5 0V10m-5 4h5l-5 6h5" />
    </svg>
  ),
  cal: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M8 2v4m8-4v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </g>
    </svg>
  ),
  caldown: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="m14 18l4 4l4-4M16 2v4m2 8v8" />
        <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343M3 10h18M8 2v4" />
      </g>
    </svg>
  ),
  calup: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="m14 18l4-4l4 4M16 2v4m2 16v-8" />
        <path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9M3 10h18M8 2v4" />
      </g>
    </svg>
  ),
  grid: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </g>
    </svg>
  ),
  list: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13" />
    </svg>
  ),
  table: ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={style}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
      />
    </svg>
  ),
};
