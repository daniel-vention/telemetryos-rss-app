/**
 * RSS Feed DTO - Represents a user-configured RSS feed
 */
export interface RssFeed {
  /** Unique identifier for the feed */
  id: string
  /** Display name for the feed */
  name: string
  /** RSS/Atom feed URL */
  url: string
}
