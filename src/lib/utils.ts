export function getVariant(arr: string[], index: number) {
  return arr[index % arr.length];
}
