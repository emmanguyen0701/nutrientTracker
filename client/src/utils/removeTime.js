export default function removeTime(date = new Date()) {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  const myDate = new Date(y,m,d)
  const dateModified = myDate.setUTCHours(12,0,0,0)
  console.log(dateModified)
  return dateModified
}