import Dropdown from '../ui/Dropdown'
import Input from '../ui/Input'
import { useUser } from '../UserContext'

const options = {
  channelCreate: 'Channel was created',
  channelDelete: 'Channel was deleted',
  channelPinsUpdate: 'Channel pins are updated',
  channelUpdate: 'Channel was updated',
  debug: 'Debug event emitted',
  emojiCreate: 'Emoji was created',
  emojiDelete: 'Emojii was deleted',
  emojiUpdate: 'Emojii was updated',
  error: 'Error event emitted',
  guildBanAdd: 'Guild',
  guildBanRemove: 'Guild',
  guildCreate: 'Guild',
  guildDelete: 'Guild',
  guildIntegrationsUpdate: 'Guild',
  guildMemberAdd: 'Guild',
  guildMemberAvailable: 'Guild',
  guildMemberRemove: 'Guild',
  guildMembersChunk: 'Guild',
  guildMemberSpeaking: 'Guild',
  guildMemberUpdate: 'Guild',
  guildUnavailable: 'Guild',
  guildUpdate: 'Guild',
  invalidated: 'Invalidated',
  inviteCreate: 'Invite was created',
  inviteDelete: 'Invite was deleted',
  message: 'User posts a message',
  messageDelete: 'Message is deleted',
  messageDeleteBulk: 'Message is deleted (bulk)',
  messageReactionAdd: 'Message was reacted to',
  messageReactionRemove: 'Message reaction was removed',
  messageReactionRemoveAll: 'Message reactions were all removed',
  messageReactionRemoveEmoji: 'Message reaction removed emoji',
  messageUpdate: 'Message is updated',
  presenceUpdate: 'Presence updated',
  rateLimit: 'Rate limit event',
  ready: 'Ready event',
  roleCreate: 'Role was created',
  roleDelete: 'Role was deleted',
  roleUpdate: 'Role was updated',
  shardDisconnect: 'Shard event',
  shardError: 'Shard event',
  shardReady: 'Shard event',
  shardReconnecting: 'Shard event',
  shardResume: 'Shard event',
  typingStart: 'User has started typing',
  userUpdate: 'User was updated',
  voiceStateUpdate: 'Voice chat state updated',
  warn: 'Warn event emitted',
  webhookUpdate: 'Webhooks were updated'
}

const EventHandler = ({ event }) => {
  const { updateEvent } = useUser()

  const setKey = (key) => {
    updateEvent({
      id: event.id,
      key: key
    })
  }

  const setWebhookURL = (url) => {
    updateEvent({
      id: event.id,
      webhook_url: url
    })
  }

  return (
    <section className="my-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
      <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
        <Dropdown
          defaultSelection={event.key}
          onChange={setKey}
          options={options}
        />
      </div>
      <div className="p-4 rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2">
        <Input
          placeholder="https://send-a-webhook-to-this-url.com"
          defaultValue={event.webhook_url}
          onBlur={setWebhookURL}
        />
      </div>
    </section>
  )
}

export default EventHandler
