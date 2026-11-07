/** Fundo decorativo fixo: grade suave e luzes que derivam devagar. Preenche as laterais do site. */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
    </div>
  )
}
