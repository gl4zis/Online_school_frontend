export function dateToString(date: Date | undefined): string | undefined {
    if (!date)
        return undefined

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${year}-${month+1}-${day}`
}