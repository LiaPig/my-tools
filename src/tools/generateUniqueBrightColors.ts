/**
 * 生成指定数量的不重复鲜艳颜色
 * @param count 颜色数量
 * @returns 不重复的颜色数组
 */
const generateUniqueBrightColors = (count: number): string[] => {
  const colors = new Set<string>()

  // 生成指定数量的不重复颜色
  while (colors.size < count) {
    // 确保生成的颜色鲜艳
    const r = Math.floor(Math.random() * 200)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    const colorHex = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    colors.add(colorHex)
  }

  return Array.from(colors)
}

export default generateUniqueBrightColors
