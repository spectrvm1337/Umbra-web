const WEB = [
  { code: '!g', label: 'Google' },
  { code: '!yt', label: 'YouTube' },
  { code: '!gh', label: 'GitHub' },
  { code: '!wiki', label: 'Wikipedia' },
  { code: '!d', label: 'DuckDuckGo' },
  { code: '!red', label: 'Reddit' },
  { code: '!so', label: 'Stack Overflow' },
  { code: '!npm', label: 'npm' },
  { code: '!py', label: 'PyPI' },
  { code: '!translate', label: 'Google Translate' },
] as const

const TOOLS = [
  { code: '(2+3)*4', label: 'Calculator in the box: + − × ÷ ^ %, brackets, 200+10%' },
  { code: '100 usd to rub', label: 'Live currency converter' },
  { code: '#c83939', label: 'Colour info, and !color picks any colour on screen' },
  { code: '!font <name>', label: 'Switch the interface to any installed font' },
  { code: 'link or path', label: 'Paste a URL, a file or a folder and it opens' },
] as const

const SYSTEM = [
  { code: '!help', label: 'Every command, in a list you can click' },
  { code: 'kill', label: 'Terminate a process by name — shows the app it found' },
  { code: 'shutdown', label: 'Power off the machine' },
  { code: 'restart', label: 'Reboot the machine' },
  { code: 'sleep', label: 'Suspend to RAM' },
] as const

function CommandList({
  items,
}: {
  items: Readonly<{ code: string; label: string }[]>
}) {
  return (
    <div className="commands">
      {items.map((item) => (
        <div className="command" key={item.code}>
          <span className="command__code">{item.code}</span>
          <span className="command__label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function Commands() {
  return (
    <section className="section" id="commands">
      <p className="section__eyebrow" data-reveal="">Commands</p>
      <h2 className="section__title" data-reveal="">Type it, it happens</h2>
      <p className="section__lead" data-reveal="">
        Nothing to learn beyond one character. A leading <code>!</code> sends the rest of
        the line to the web; numbers, colours and plain words are answered right in the box.
      </p>

      <div className="commands-block" data-reveal="">
        <h3 className="commands-block__title">Web prefixes</h3>
        <CommandList items={WEB} />
      </div>

      <div className="commands-block" data-reveal="">
        <h3 className="commands-block__title">Tools</h3>
        <CommandList items={TOOLS} />
      </div>

      <div className="commands-block" data-reveal="">
        <h3 className="commands-block__title">System</h3>
        <CommandList items={SYSTEM} />
      </div>
    </section>
  )
}
