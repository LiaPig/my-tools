
/**
 * 创建一个防抖函数，该函数在指定的延迟时间内只会执行一次。
 * @template T 函数的类型，该函数接受任意参数并返回void。
 * @param {T} func - 需要防抖处理的函数。
 * @param {number} wait - 延迟执行的时间，单位为毫秒。
 * @returns {(...args: Parameters<T>) => void} 返回一个新的函数，该函数在指定的延迟时间内只会执行一次。
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  // 检查延迟时间是否为负数，如果是，则抛出错误
  if (wait < 0) {
    throw new Error('Wait time cannot be negative.')
  }

  // 保存定时器的引用，用于取消之前的定时器
  let timeoutId: number | null = null

  // 返回一个新的函数，用于实现防抖逻辑
  return function (...args) {
    // 保存当前函数调用的上下文
    const context = this

    // 如果存在定时器，则取消之前的定时器
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    // 设置一个新的定时器，用于延迟执行传入的函数
    timeoutId = setTimeout(() => {
      // 执行原始函数，并应用当前上下文和参数
      func.apply(context, args)
    }, wait)
  }
}

export default debounce
