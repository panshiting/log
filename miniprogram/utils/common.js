export function getTime (time) {
  if (time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
    const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    const min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    const sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`
  } else {
    return ''
  }
}