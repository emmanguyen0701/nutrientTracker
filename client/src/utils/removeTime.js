
export default function removeTime(date = new Date()) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  return new Date(y,m,d)
}