/** Renderiza `**trecho**` como destaque, . */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-medium text-foreground">{part}</span>
        ) : (
          part
        ),
      )}
    </>
  )
}
