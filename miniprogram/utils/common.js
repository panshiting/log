export function getTime (time) {
  if (time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    const hours = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`
  } else {
    return ''
  }
}