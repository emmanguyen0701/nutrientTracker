export default function capitalizeFirstLetter(string) {
    let r = string.charAt(0).toUpperCase()
    let n = string.slice(1)
    for (const s of n) {
        r += s.toLowerCase()
    }
    return r
}
