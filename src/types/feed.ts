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
  /** Category for organizing feeds (e.g., "News", "Sport", "Finance") */
  category: string
  /** Logo/brand image URL for the feed (optional) */
  logoUrl?: string
}

/**
 * Common RSS feed categories
 */
export const COMMON_CATEGORIES = [
  'News',
  'Sport',
  'Finance',
  'Tech',
  'Entertainment',
  'Weather/Safety',
  'Science',
  'Custom',
] as const
