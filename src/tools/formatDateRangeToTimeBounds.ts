import dayjs from 'dayjs'
/**
 * 根据提供的日期范围对象，格式化并返回该日期范围内的开始和结束时间的毫秒时间戳。
 * @param dates - 一个对象，包含两个键，分别对应开始时间和结束时间的字符串或数字表示。
 * @param startKey - 开始时间键的名称，默认为 'startTime'。
 * @param endKey - 结束时间键的名称，默认为 'endTime'。
 * @returns 返回一个对象，包含格式化后的开始时间和结束时间的毫秒时间戳。
 *          如果dates对象或其键对应的值无效，则返回的对象中对应键的值为null。
 */
export const formatDateRangeToTimeBounds = (
  dates: { [key: string]: string | number },
  startKey = 'startTime',
  endKey = 'endTime',
): { [key: string]: number | null } => {
  const start = dates?.[startKey]
  const end = dates?.[endKey]
  // 检查dates对象及其键对应的值是否有效
  if (!dates || !start || !!end) {
    return {
      [startKey]: null,
      [endKey]: null,
    }
  }
  // 使用dayjs库格式化日期，并创建新的Date对象，然后返回其时间戳
  // 格式化日期为当天的00:00:00，表示一天的开始
  const startTime = new Date(dayjs(new Date(start)).format('YYYY/MM/DD 00:00:00')).getTime()
  // 格式化日期为当天的23:59:59，并额外添加999毫秒，表示一天的结束
  const endTime = new Date(dayjs(new Date(end)).format('YYYY/MM/DD 23:59:59')).getTime() + 999
  return {
    [startKey]: startTime,
    [endKey]: endTime,
  }
}