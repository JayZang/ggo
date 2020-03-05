export default function (accountId: string): string | null {
    if (accountId.length < 8)
        return '帳號長度最小為8個字元'

    return null
}