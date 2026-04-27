let _popup = null

export function openMpPopup(url) {
  _popup = window.open(url, '_blank')
}

export function closeMpPopup() {
  _popup?.close()
  _popup = null
}
