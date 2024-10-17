// 定义一个类型，表示对象数组，其中对象的键是字符串，值是任意类型
type ObjectArray = {
  [key: string]: any
}[]

// 定义一个类型，表示映射字段的键值对，其中键是数组的名称，值是此数组里元素的用于标识唯一性的字段名
type MapDiffkeyField = {
  [key: string]: string
};

// demo
// getDifferentFieldsList(
//   [
//     { id: 1, a: 1, b: 2, c: 3, d: 4, list: [{ key: 1, value1: 2, value2: 2 }] },
//     { id: 2, a: 4, b: 3, c: 2, d: 1 },
//   ],
//   [
//     { id: 1, a: 1, b: 2, c: 3, d: 4, list: [{ key: 1, value1: 3, value2: 2 }] },
//     { id: 2 },
//     { id: 3, a: 5 }
//   ],
//   'id',
//   { list: 'key' }
// )

/**
 * 比较两个对象数组，找出不同的字段，并返回带有不同字段信息的新数组
 * @param list - 第一个对象数组
 * @param anotherList - 第二个对象数组
 * @param keyField - 用于标识唯一性的字段名
 * @param mapDiffkeyField - 映射字段的键值对，用于处理嵌套数组中的对象
 * @returns 返回两个数组，每个数组包含清洗后的对象，带有 differentFields 字段
 */
function getDifferentFieldsList(
  list: ObjectArray,
  anotherList: ObjectArray,
  keyField?: string,
  mapDiffkeyField?: MapDiffkeyField
): [ObjectArray, ObjectArray] {
  if (!keyField) {
    return [list, anotherList]
  }

  // 1. 获取到两个对象数组里的所有字段（key/field）
  const differentFields = Array.from(
    new Set([
      ...list.reduce((arr: string[], item) => [...arr, ...Object.keys(item)], []),
      ...anotherList.reduce((arr: string[], item) => [...arr, ...Object.keys(item)], [])
    ])
  )
  // 2. 通用函数：根据 keyField 得出不一样的字段表，并清洗成带有 differentFields 字段的数据格式
  const getFilterDifferentList = (
    list: ObjectArray,
    anotherList: ObjectArray
  ): ObjectArray => {
    const resultList = list?.map(item => {
      // 找出另外一个对象数组里，和当前对象 keyField 相同的对象
      const anotherItem = anotherList?.find(another => another?.[keyField] === item?.[keyField])
      const newItem = { ...item }
      Object.keys(newItem).map(key => {
        const value = newItem[key]
        // 如果是数组，则递归调用 getDifferentFieldsList 函数
        if (Array.isArray(value)) {
          newItem[key] = getDifferentFieldsList(value, anotherItem?.[key] || [], mapDiffkeyField?.[key])?.[0]
        }
      })
      return {
        ...newItem,
        // 不一样的字段
        // 如果没有找到另外一个对象，则返回全部字段
        // 如果找到了，则返回不一样的字段
        differentFields: !anotherItem
          ? differentFields
          : differentFields?.filter(field => item?.[field] !== anotherItem?.[field])
      }
    })

    return resultList
  }

  // 3. 给数据都加上 differentFields 字段
  const resultRawData = getFilterDifferentList(list, anotherList)
  const resultChangedData = getFilterDifferentList(anotherList, list)
  return [resultRawData, resultChangedData]
}

export default getDifferentFieldsList