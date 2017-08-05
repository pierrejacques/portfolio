// in scrollCatcher you bind your handler to it
// when the scrollWheel event is on, the scrollCatcher give your handler +1 or -1
const scrollCatcher = (handler, config = {}) => {
  let isTrigger = false;
  let isHolding = false;
  const inThres = config.threshold || 60
  const outThres = config.threshold || 30 // notice that the inThres should always be higher than the outThres
  const hold = config.hold || 300
  const autoClose = config.autoClose || 300
  document.onmousewheel= e => {
    const delta = e.wheelDelta
    if (!isTrigger && Math.abs(delta) > inThres) {
      isTrigger = true
      isHolding = true
      setTimeout(() => {
        isHolding = false
      }, hold)
      setTimeout(() => {
        isTrigger = false
      }, autoClose)
      handler(delta > 0 ? 1 : -1)
    }
    if (isTrigger && !isHolding && Math.abs(delta) < outThres) {
      isTrigger = false
    }
  }
}

export default scrollCatcher
