import { platform as os } from 'node:process';
import { execFileSync } from 'node:child_process';

const OS_CMD: Record<string, string> = Object.freeze({
  darwin: "open",
  win32: "explorer",
  linux: "xdg-open",
})

/** Open file or path with default application */
export function open(target: string) {
  if (!Object.keys(OS_CMD).includes(os)) throw new Error(`unsupported os: ${os}`)

  // Directory should be opened in default explorer. This is the only supported mode for windows
  const reveal = target.endsWith(os === 'win32' ? '\\' : '/')

  return execFileSync(OS_CMD[os], [target])
}
