export default function removeTime(date = new Date()) {
  return date.setUTCHours(12,0,0,0)
}

