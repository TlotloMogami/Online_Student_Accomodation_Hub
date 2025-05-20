import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../App";

const AuthContext = createContext({
    user: null
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [session, setSession] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const {data: listener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log('session onAuthStateChange: ', session)
                setSession(session)
                setUser(session?.user || null)
                setLoading(false)
            }
        )
        return () => {
            listener.subscription.unsubscribe()
        }
    },[])

    const SignIn = async (email, password) => {
        setLoading(true)
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        setLoading(false)
        return {data, error}
    }

    const SignOut = async () => {
        console.log("Logging out!")
        const {error} = await supabase.auth.signOut()
        console.log('error', error)
        if(!error){
            setUser(null)
            setSession(null)
        }
        return {error}
    }

    return (
        <AuthContext.Provider value={{user, loading, SignIn, SignOut, setSession}}>
            {
               children 
            }
        </AuthContext.Provider>
    )

}