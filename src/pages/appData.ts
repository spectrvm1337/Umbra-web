/** Данные списка результатов для окна приложения Umbra. */
export type ResultItem = {
  id: string
  name: string
  path: string
  kind: 'app' | 'folder' | 'document' | 'audio' | 'video'
}

export const results: ResultItem[] = [
  {
    id: 'chrome',
    name: 'Chrome',
    path: 'C:\\Program Files\\Google\\Chrome\\Application',
    kind: 'app',
  },
  {
    id: 'modrinth',
    name: 'Modrinth',
    path: 'C:\\Users\\Spectrvm\\AppData\\Roaming\\Modrinth',
    kind: 'app',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    path: 'C:\\Program Files\\Spotify',
    kind: 'app',
  },
  {
    id: 'firefox',
    name: 'Firefox',
    path: 'C:\\Users\\User\\AppData\\Roaming\\Mozilla',
    kind: 'app',
  },
  {
    id: 'discord',
    name: 'Discord',
    path: 'C:\\Users\\User\\AppData\\Roaming\\Discord',
    kind: 'app',
  },
]
