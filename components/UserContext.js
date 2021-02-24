import { useEffect, useState, createContext, useContext } from 'react'
import { postData } from '../utils/helpers'
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
    session &&
      fetch('/api/session', {
        headers: {
          Authorization: 'Bearer ' + session.access_token
        }
      }).then((r) => r.json())
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        session &&
          fetch('/api/session', {
            headers: {
              Authorization: 'Bearer ' + session.access_token
            }
          }).then((r) => r.json())
        setUser(session?.user ?? null)
      }
    )
    return () => {
      authListener.unsubscribe()
    }
  }, [])

  // Get the user details.
  const getUserDetails = () => supabase.from('users').select('*').single()

  // Update the user details in the backend.
  const updateUser = async (user) => {
    await supabase.from('users').update(user).eq('id', user.id).single()
  }

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
      .single()

    // Sync bot service
    await postData({
      url: '/api/syncronize',
      token: session.access_token,
      data: { id: event.application_id }
    })
    return data
  }
  const createEvent = async (id) => {
    const { data } = await supabase
      .from('events')
      .insert([{ application_id: id }])
      .single()
    return data
  }

  const deleteEvent = async (id) => {
    await supabase.from('events').delete().eq('id', id)
  }

  const getApplications = async () => {
    const { data } = await supabase.from('applications').select('*')
    return data
  }

  const getApplication = async (id) => {
    const { data } = await supabase
      .from('applications')
      .select('*, events(*)')
      .eq('id', id)
      .single()
    return data
  }

  const createApplication = async () => {
    const { data } = await supabase
      .from('applications')
      .insert([{ user_id: userDetails.id }])
      .single()
    return data
  }

  const updateApplication = async (app) => {
    // Update backend
    const { data } = await supabase
      .from('applications')
      .update(app)
      .eq('id', app.id)

    // Sync bot service
    await postData({
      url: '/api/syncronize',
      token: session.access_token,
      data: { id: app.id }
    }).catch(console.error)
    return data
  }

  const deleteApplication = async (id) => {
    await supabase.from('events').delete().eq('application_id', id)
    await supabase.from('applications').delete().eq('id', id)
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
    updateUser,
    updateEvent,
    createEvent,
    deleteEvent,
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication
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
