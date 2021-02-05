import { supabaseAdmin } from '../../utils/initSupabaseAdmin'

const syncronize = async (req, res) => {
  if (req.method === 'POST') {
    const token = req.headers.token
    const { data: user, error } = await supabaseAdmin.auth.api.getUser(token)
    if (error) throw error

    const { data: application } = await supabaseAdmin
      .from('applications')
      .select('*')
      .eq('id', req.body.id)
      .single()

    // Authorize request to this application
    if (user.id !== application.user_id) return

    // Tell nakama-bot service to pull the new updates from backend
    const response = await fetch(
      `https://la9pxd3pzg.execute-api.us-east-2.amazonaws.com/app/${req.body.id}`,
      {
        method: 'POST',
        headers: new Headers({
          'api-key': process.env.NAKAMA_API_KEY
        })
      }
    ).then((res) => res.json())
    return res.status(200).json(response)
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default syncronize
