import {Profile} from "@/service/dtoInterfaces";

interface ProfileState extends Profile {
    photoStr?: string
}

interface ProfileStore {
    profile?: ProfileState,
    updateProfile: (profile: ProfileState) => void,
    resetProfile: () => void
}

export const profileStore: ProfileStore = {
    profile: getState(),

    updateProfile(profile: ProfileState): void {
        this.profile = profile
        saveState(this.profile)
    },

    resetProfile(): void {
        this.profile = undefined
        saveState(this.profile)
    }
}

function getState(): ProfileState | undefined {
    const savedProfile: string | null = localStorage.getItem('profile')
    if (savedProfile)
        return JSON.parse(savedProfile)

    return undefined
}

function saveState(profile: ProfileState | undefined): void {
    if (profile)
        localStorage.setItem('profile', JSON.stringify(profile))
    else
        localStorage.removeItem('profile')
}