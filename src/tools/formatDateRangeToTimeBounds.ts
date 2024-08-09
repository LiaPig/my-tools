import dayjs from 'dayjs'
/**
 * 根据提供的日期范围对象，格式化并返回该日期范围内的开始和结束时间的毫秒时间戳。
 * @param dates - 一个对象，包含两个键，分别对应开始时间和结束时间的字符串或数字表示。
 * @param startKey - 开始时间键的名称，默认为 'startTime'。
 * @param endKey - 结束时间键的名称，默认为 'endTime'。
 * @returns 返回一个对象，包含格式化后的开始时间和结束时间的毫秒时间戳。
 *          如果dates对象或其键对应的值无效，则返回的对象中对应键的值为null。
 */
const formatDateRangeToTimeBounds = (
  dates: { [key: string]: string | number },
  startKey = 'startTime',
  endKey = 'endTime',
) => {
  const start = new Date(dates?.[startKey])
  const end = new Date(dates?.[endKey])
  // 检查dates对象及其键对应的值是否有效
  if (!dates || !start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      [startKey]: null,
      [endKey]: null,
    }
  }
  // 使用dayjs库格式化日期，并创建新的Date对象，然后返回其Unix时间戳
  // 格式化日期为当天的00:00:00，表示一天的开始
  const startTime = dayjs(start).startOf('day').valueOf()
  // 格式化日期为当天的23:59:59，表示一天的结束
  const endTime = dayjs(end).endOf('day').valueOf()

  return {
    [startKey]: startTime,
    [endKey]: endTime,
  }
}

export default formatDateRangeToTimeBounds
