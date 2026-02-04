import {
  SettingsField,
  SettingsLabel,
  SettingsInputFrame,
  SettingsButtonFrame,
  SettingsBox,
  SettingsHeading,
  SettingsDivider,
  SettingsHint,
} from '@telemetryos/sdk/react'
import { useCallback, useState } from 'react'
import { useRssFeedsStoreState } from '../../../hooks/store'
import type { RssFeed } from '../../../types'

/**
 * RssFeedManager - Component for managing RSS feed URLs
 * 
 * Allows users to:
 * - Add new RSS feeds (name + URL)
 * - Edit existing feeds
 * - Remove feeds
 */
export function RssFeedManager() {
  const [isLoading, feeds, setFeeds] = useRssFeedsStoreState(250)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editUrl, setEditUrl] = useState('')

  const generateId = useCallback(() => {
    return `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const handleAdd = useCallback(() => {
    const newFeed: RssFeed = {
      id: generateId(),
      name: '',
      url: '',
    }
    setFeeds([...feeds, newFeed])
    // Start editing the new feed immediately
    setEditingId(newFeed.id)
    setEditName('')
    setEditUrl('')
  }, [feeds, setFeeds, generateId])

  const handleRemove = useCallback(
    (id: string) => {
      setFeeds(feeds.filter((feed) => feed.id !== id))
      if (editingId === id) {
        setEditingId(null)
        setEditName('')
        setEditUrl('')
      }
    },
    [feeds, setFeeds, editingId]
  )

  const handleStartEdit = useCallback(
    (feed: RssFeed) => {
      setEditingId(feed.id)
      setEditName(feed.name)
      setEditUrl(feed.url)
    },
    []
  )

  const handleSaveEdit = useCallback(() => {
    if (!editingId) return

    const updatedFeeds = feeds.map((feed) =>
      feed.id === editingId
        ? {
            ...feed,
            name: editName.trim(),
            url: editUrl.trim(),
          }
        : feed
    )
    setFeeds(updatedFeeds)
    setEditingId(null)
    setEditName('')
    setEditUrl('')
  }, [editingId, editName, editUrl, feeds, setFeeds])

  const handleCancelEdit = useCallback(() => {
    setEditingId(null)
    setEditName('')
    setEditUrl('')
  }, [])

  return (
    <>
      <SettingsHeading>RSS Feeds</SettingsHeading>
      <SettingsHint>
        Add, edit, or remove RSS feed sources. Each feed requires a name and URL.
      </SettingsHint>

      {feeds.length > 0 && (
        <SettingsBox>
          {feeds.map((feed) => {
            const isEditing = editingId === feed.id

            return (
              <div key={feed.id} style={{ marginBottom: '1.5rem' }}>
                {isEditing ? (
                  <>
                    <SettingsField>
                      <SettingsLabel>Feed Name</SettingsLabel>
                      <SettingsInputFrame>
                        <input
                          type="text"
                          placeholder="e.g., BBC News"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          disabled={isLoading}
                        />
                      </SettingsInputFrame>
                    </SettingsField>

                    <SettingsField>
                      <SettingsLabel>Feed URL</SettingsLabel>
                      <SettingsInputFrame>
                        <input
                          type="url"
                          placeholder="https://example.com/feed.xml"
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                          disabled={isLoading}
                        />
                      </SettingsInputFrame>
                    </SettingsField>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <SettingsButtonFrame>
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          disabled={isLoading || !editName.trim() || !editUrl.trim()}
                        >
                          Save
                        </button>
                      </SettingsButtonFrame>
                      <SettingsButtonFrame>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                      </SettingsButtonFrame>
                      <SettingsButtonFrame>
                        <button
                          type="button"
                          onClick={() => handleRemove(feed.id)}
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </SettingsButtonFrame>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>{feed.name || '(Unnamed Feed)'}</strong>
                    </div>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: '#999' }}>
                      {feed.url || '(No URL)'}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <SettingsButtonFrame>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(feed)}
                          disabled={isLoading}
                        >
                          Edit
                        </button>
                      </SettingsButtonFrame>
                      <SettingsButtonFrame>
                        <button
                          type="button"
                          onClick={() => handleRemove(feed.id)}
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </SettingsButtonFrame>
                    </div>
                  </>
                )}
                {feeds.indexOf(feed) < feeds.length - 1 && <SettingsDivider />}
              </div>
            )
          })}
        </SettingsBox>
      )}

      <SettingsField>
        <SettingsButtonFrame>
          <button type="button" onClick={handleAdd} disabled={isLoading}>
            + Add RSS Feed
          </button>
        </SettingsButtonFrame>
      </SettingsField>
    </>
  )
}
