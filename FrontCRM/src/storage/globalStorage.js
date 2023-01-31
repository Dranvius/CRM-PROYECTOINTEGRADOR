import {create} from 'zustand';
import {persist} from 'zustand/middleware'

export const useAuthStore = create(persist((set) =>({
    token:"",
    user:null,
    isAuth:false,
    setToken: (token) => set((state) => ({
        token,
        isAuth: true,
    })),
    setUser: (user) => set((state) => ({
        user
    })),
    logout: () => set((state) => ({
        token: '',
        user: null,
        isAuth: false,

    }))
}),{
    name: 'auth'
}))