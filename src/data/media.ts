export type HeroVideo = {
  /** Caminho em /public, ex.: '/hero-loop.mp4'. */
  mp4: string
  /** Opcional: versao WebM (menor), servida primeiro para quem suporta. */
  webm?: string
  /** Opcional: primeiro quadro, exibido enquanto o video carrega e com "reduzir movimento". */
  poster?: string
}

/**
 * Video de fundo do hero (ex.: um loop gerado no Higgsfield).
 * Com `null`, o hero usa a animacao WebGL de components/HeroMedia.tsx.
 * Hoje: loop abstrato gerado no Higgsfield (Seedance 2.0 Mini, 8 s, 720p).
 * Para trocar: salve o arquivo em /public e aponte `mp4` para ele.
 */
export const heroVideo = { mp4: '/hero-loop.mp4' } as HeroVideo | null
