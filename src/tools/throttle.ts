/**
 * 创建一个节流函数，该函数在指定的时间间隔内最多执行一次。
 * @param func 需要节流的函数。
 * @param interval 时间间隔（毫秒），在该时间间隔内最多执行一次函数。
 * @returns 返回一个新的函数，用于实现节流逻辑。
 */
function throttle<T extends (...args: any[]) => any>(func: T, interval: number): (...args: Parameters<T>) => void {
  // 检查延迟时间是否为负数，如果是，则抛出错误
  if (interval < 0) {
    throw new Error('Interval cannot be negative.')
  }
  // 记录上一次函数执行的时间戳
  let lastTime = new Date().getTime()

  /**
  * 返回一个新的函数，用于实现节流逻辑。
  * @param args 原始函数的参数。
  * @returns 一个不返回任何值的函数。
  */
  return function (...args) {
    // 保存当前函数调用的上下文
    const context = this
    // 记录当前时间
    const now = new Date().getTime()

    // 如果当前时间与上一次执行时间的差值大于等于指定的时间间隔，则执行函数
    if (now - lastTime >= interval) {
      // 执行原始函数，并应用当前上下文和参数
      func.apply(context, args)
      // 将本次的触发时间，作为下次触发事件的参考时间
      lastTime = now
    }
  }
}

export default throttle