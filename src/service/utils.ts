export function dateToString(date: Date | undefined): string | undefined {
    if (!date)
        return undefined

    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    const year = date.getFullYear().toString()

    if (Number(day) < 10 && Number(day) > 0)
        day = '0' + day

    if (Number(month) < 10 && Number(month) > 0)
        month = '0' + month

    return `${year}-${month}-${day}`
}

export function calculateAge (birthDate: Date): number {
    const now: Date = new Date();

    let years: number = (now.getFullYear() - birthDate.getFullYear());

    if (now.getMonth() < birthDate.getMonth() ||
        now.getMonth() == birthDate.getMonth() &&
        now.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}