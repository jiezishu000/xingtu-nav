// 积分格式化：数据库存字符串，显示时格式化
export function formatPoints(points: string): string {
  const n = BigInt(points)
  const yi = n / 100_000_000n
  const wan = n / 10_000n
  if (n >= 100_000_000n) return `${yi.toLocaleString()}亿`
  if (n >= 10_000n) return `${wan.toLocaleString()}万`
  return points
}

// 积分解析：用户输入转BigInt
export function parsePoints(input: string): bigint {
  const num = input.replace(/[^0-9]/g, '')
  return BigInt(num || '0')
}

// 安全加法（字符串入字符串出）
export function addPoints(a: string, b: string): string {
  return (BigInt(a) + BigInt(b)).toString()
}

// 安全减法（字符串入字符串出，不小于0）
export function subPoints(a: string, b: string): string {
  const result = BigInt(a) - BigInt(b)
  return result < 0n ? '0' : result.toString()
}
