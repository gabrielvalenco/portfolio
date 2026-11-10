/** Monograma GV (o mesmo desenho de public/favicon.svg): G em papel cuja barra vira um V em limao. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden className={className}>
      <rect width="1024" height="1024" rx="230" fill="#0a0a11" />
      <path
        fill="#f2efe6"
        d="M553 186H394C226 186 91 322 91 490S226 794 394 794H637L556 663H394C297 663 218 586 218 490S297 321 394 321H553C590 321 620 291 620 254S590 186 553 186Z"
      />
      <path
        fill="#c6ff3a"
        d="M485 548H640L687 626L791 452Q806 427 835 427H884C923 427 946 466 926 500L723 817Q711 839 687 839Q663 839 650 817Z"
      />
      <path fill="#f2efe6" d="M357 427H524Q567 427 591 467L640 548H357C324 548 297 521 297 488S324 427 357 427Z" />
    </svg>
  )
}
