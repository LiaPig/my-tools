/**
 * 下载JSON数据为文件。
 * 
 * @param object 要下载的数据对象。
 * @param filename 下载文件的名称，包括扩展名。
 */
function downloadJSON(object: Record<string, unknown>, filename: string) {
   // 将数据对象转换为JSON字符串，并创建一个Blob对象
  const blob = new Blob([JSON.stringify(object)], { type: 'application/json' })

  // 创建一个URL对象，用于生成下载链接
  const url = URL.createObjectURL(blob)
  // 创建一个链接元素
  const link = document.createElement('a')
  // 设置链接的href属性为生成的URL
  link.href = url
  // 设置链接的下载属性为指定的文件名
  link.download = filename

  // 将链接添加到页面上，点击链接即可下载数据结构
  document.body.appendChild(link)
  // 模拟点击链接以触发下载
  link.click()

  // 清理URL对象，释放资源
  URL.revokeObjectURL(url)
  // 移除添加到页面上的链接元素
  document.body.removeChild(link)
}

export default downloadJSON