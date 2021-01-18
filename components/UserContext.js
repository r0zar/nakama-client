import { useEffect, useState, createContext, useContext } from 'react'
import { supabase } from '../utils/initSupabase'

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false)
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  // Get the user details.
  const getUserDetails = () => supabase.from('users').select('*').single()

  // Get the user's trialing or active subscription.
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

  const updateEvent = async (event) => {
    const { data } = await supabase
      .from('events')
      .update(event)
      .eq('id', event.id)
    return data[0]
  }
  const createEvent = async (id) => {
    const { data } = await supabase
      .from('events')
      .insert([{ application_id: id }])
    return data[0]
  }

  const createApplication = async () => {
    const { data } = await supabase
      .from('applications')
      .insert([{ user_id: userDetails.id }])
    return data[0]
  }

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          setUserDetails(results[0].value.data)
          setSubscription(results[1].value.data)
          setUserLoaded(true)
        }
      )
    }
  }, [user])

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    subscription,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      setUserDetails(null)
      setSubscription(null)
      return supabase.auth.signOut()
    },
    updateEvent,
    createEvent,
    createApplication
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.')
  }
  return context
}
