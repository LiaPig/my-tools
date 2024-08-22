/**
 * 延迟函数，用于创建一个在指定时间后解决的Promise。
 * 
 * 使用此函数可以在异步函数中实现同步等待的效果。
 * 
 * 如果提供的延迟时间不是一个正数，函数将抛出错误。
 * 
 * @param {number} ms - 延迟时间，以毫秒为单位。必须是正数。
 * @returns {Promise<void>} 一个在指定延迟后解决的Promise。
 * @throws {Error} 如果ms不是正数，将抛出错误。
 */
function delay(ms: number): Promise<void> {
  // 检查 ms 是否为正数
  if (ms < 0) {
    throw new Error('延迟时间不能为负数')
  }

  return new Promise(resolve => setTimeout(resolve, ms))
}

export default delay