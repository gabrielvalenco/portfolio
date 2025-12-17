import { SVGProps } from 'react'

export default function LogoGV(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M14 21h4a2 2 0 0 0 2-2v-7" />
      <path d="M14 3h4a2 2 0 0 1 2 2v2" />
      <path d="M15 12h5" />
    </svg>
  )
}
