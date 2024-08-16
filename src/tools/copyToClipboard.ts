/**
 * 使用 document.execCommand 方法作为回退方案复制文本到剪贴板
 * @param text 需要复制的文本字符串
 */
function fallbackCopyTextToClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  // 将 textarea 定位到屏幕外
  textarea.style.position = 'absolute'
  textarea.style.top = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  // 尝试执行复制操作
  const result = document.execCommand('copy')
  if (result) {
    console.log('使用回退方法复制成功')
  } else {
    console.error('复制失败，请手动复制')
  }

  // 清理 DOM
  document.body.removeChild(textarea)
}

/**
 * 复制文本到剪贴板的函数
 * 首先尝试使用异步 Clipboard API，如果不支持则回退到 document.execCommand 方法
 * @param text 需要复制的文本字符串
 */
function copyToClipboard(text: string) {
  // 检查异步剪贴板 API 是否可用
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // 使用异步 Clipboard API 复制文本
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('复制成功')
      })
      .catch((err) => {
        console.error('使用异步 API 复制失败: ', err)
        // 如果异步 API 失败，尝试使用 document.execCommand
        fallbackCopyTextToClipboard(text)
      })
  } else {
    // 不支持异步 API，直接使用 document.execCommand 方法
    fallbackCopyTextToClipboard(text)
  }
}

export default copyToClipboard