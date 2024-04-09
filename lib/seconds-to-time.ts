export function secondsToTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0")

  return `${h}:${m}:${s}`
}

export function SecondsToTimeMinutes(seconds: number) {
  const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0")

  return `${m}:${s}`
}
