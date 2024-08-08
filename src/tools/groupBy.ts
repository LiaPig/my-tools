/**
 * 将对象数组中某个 key 相同的元素进行分组。
 * @param arr 对象数组。
 * @param key 用于分组的属性名。
 * @returns 一个新的对象，其中每个属性都是 key 对应的值，值是一个数组，包含所有具有该 key 值的对象。
 */

const groupBy = (arr: any[], key: string) => {
  if (!arr?.length) {
    return {}
  }
  return arr?.reduce((acc, item) => {
    // 找到当前 item 的对应的 key 的 value 值
    const keyValue = item?.[key]
    if (!keyValue) {
      return arr
    }
    // 如果 acc 中没有这个 key，初始化一个数组
    if (!acc[keyValue]) {
      acc[keyValue] = []
    }
    // 将当前 item 添加到对应的数组中
    acc[keyValue].push(item)
    return acc
  }, {})
}


export default groupBy