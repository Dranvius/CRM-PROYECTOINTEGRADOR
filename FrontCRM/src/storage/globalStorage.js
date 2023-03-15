import {create} from 'zustand';
import {persist} from 'zustand/middleware'

export const useAuthStore = create(persist((set) =>({

    //!Inicio de varaiblaes
    token:"",
    user:null,
    isAuth:false,

    //!ESTABLECER TOKEN DE MANERA GLOBAL
    setToken: (token) => set((state) => ({
        token,
        isAuth: true,
    })),
    //!OBJETO DONDE SE ALMACENA DE MANERA GLOBAL EL USUARIO 
    setUser: (user) => set((state) => ({
        user
    })),
    //!Reinicio de variables globales
    logout: () => set((state) => ({
        token: '',
        user: null,
        isAuth: false,
    }))
}),{
    name: 'auth'
}))

//--->Storage?:nos permite almacenar datos de manera 
//    local en el navegador y sin necesidad de realizar alguna 
//    a una base de datos.//