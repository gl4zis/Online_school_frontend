import router from "@/router";

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

export function goToPageAndElement(url: string, elementId: string): void {
    router.push(url).then(() =>
        setTimeout(() => goToElement(elementId), 40)) // Не работает без этого костыля(
}

export function goToElement(elementId: string): void {
    const headerOffset = 150
    const element = document.getElementById(elementId)
    if (element) {
        const position = element.getBoundingClientRect().top
        window.scrollTo({
            top: document.documentElement.scrollTop + position - headerOffset,
            behavior: 'smooth'
        })
    }
}