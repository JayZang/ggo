export default function (input: HTMLInputElement, validExts: Array<String>): boolean {
    const extension = input.value.substring(input.value.lastIndexOf('.'))
    const result = validExts.map(extName => extName.toLocaleLowerCase()).includes(extension.toLocaleLowerCase())
    !result && (input.value = '')
    return result
}