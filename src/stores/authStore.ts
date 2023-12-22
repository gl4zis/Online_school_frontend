import {JwtResponse} from "@/modules/dtoInterfaces";

interface AuthState {
    access: string,
    refresh: string,
    expiredAt: number
}

interface AuthStore {
    tokens?: AuthState,
    setTokens: (tokens: JwtResponse) => void,
    resetTokens: () => void
}

export const authStore: AuthStore = {
    tokens: getState(),

    setTokens(tokens: JwtResponse): void {
        this.tokens = {
            access: tokens.access,
            refresh: tokens.refresh,
            expiredAt: tokens.expiredAt
        }
        saveState(this.tokens)
    },

    resetTokens(): void {
        this.tokens = undefined
        saveState(this.tokens)
    }
}

function saveState(tokens: AuthState | undefined): void {
    if (tokens) {
        localStorage.setItem('access', tokens.access)
        localStorage.setItem('refresh', tokens.refresh)
        localStorage.setItem('expired_at', String(tokens.expiredAt))
    } else {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('expired_at')
    }
}

function getState(): AuthState | undefined {
    const savedAccess: string | null = localStorage.getItem('access')
    const savedRefresh: string | null = localStorage.getItem('refresh')
    const savedExpired: string | null = localStorage.getItem('expired_at')

    if (savedAccess && savedRefresh && savedExpired)
        return {
            access: savedAccess,
            refresh: savedRefresh,
            expiredAt: Number(savedExpired)
        }

    return undefined
}