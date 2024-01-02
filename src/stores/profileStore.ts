import {Profile} from "@/service/dtoInterfaces";

interface ProfileStore {
    profile?: Profile,
    updateProfile: (profile: Profile) => void,
    resetProfile: () => void
}

export const profileStore: ProfileStore = {
    profile: getState(),

    updateProfile(profile: Profile): void {
        this.profile = profile
        saveState(this.profile)
    },

    resetProfile(): void {
        this.profile = undefined
        saveState(this.profile)
    }
}

function getState(): Profile | undefined {
    const savedProfile: string | null = localStorage.getItem('profile')
    if (savedProfile)
        return JSON.parse(savedProfile)

    return undefined
}

function saveState(profile: Profile | undefined): void {
    if (profile)
        localStorage.setItem('profile', JSON.stringify(profile))
    else
        localStorage.removeItem('profile')
}