type RevealProps = {
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
  className?: string
  children: React.ReactNode
}

/** Block-level reveal: blurred + sunk, then lifts into place on scroll. */
export function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  return (
    <Tag data-reveal="" className={className}>
      {children}
    </Tag>
  )
}

type SplitProps = {
  text: string
  /** 'char' for short display words, 'word' for long headings */
  mode?: 'char' | 'word'
  className?: string
}

/** Character- or word-by-word reveal for display headings. */
export function SplitText({ text, mode = 'word', className }: SplitProps) {
  const units = mode === 'char' ? [...text] : text.split(' ')

  return (
    <span className={`split ${className ?? ''}`} data-reveal="" aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="split__unit"
          style={{ '--i': i } as React.CSSProperties}
          aria-hidden="true"
        >
          {mode === 'char' ? unit : `${unit}\u00A0`}
        </span>
      ))}
    </span>
  )
}
