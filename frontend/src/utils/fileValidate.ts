export default function (input: HTMLInputElement, validExts: Array<String>): boolean {
    const extension = input.value.substring(input.value.lastIndexOf('.'))
    const result = validExts.includes(extension)
    !result && (input.value = '')
    return result
}