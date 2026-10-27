/** Renderiza `**trecho**` como destaque, no mesmo estilo dos spans de texto das paginas. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-zinc-100">{part}</span>
        ) : (
          part
        ),
      )}
    </>
  )
}
