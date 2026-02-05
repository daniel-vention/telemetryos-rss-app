/**
 * Feed Mapper Index
 * 
 * Auto-detects feed type (RSS or Atom) and routes to appropriate parser
 */

import { parseRssFeed } from './rssMapper.js'
import { parseAtomFeed } from './atomMapper.js'

/**
 * Detect feed type and parse accordingly
 * @param {string} xmlText - Raw XML text
 * @param {string} sourceId - Source feed ID
 * @param {string} sourceLogoUrl - Optional source logo URL
 * @returns {Array} Array of normalized Article objects
 */
export function parseFeed(xmlText, sourceId, sourceLogoUrl) {
  // Detect feed type by checking root element
  if (xmlText.includes('<feed') && xmlText.includes('xmlns="http://www.w3.org/2005/Atom"')) {
    // Atom feed
    return parseAtomFeed(xmlText, sourceId, sourceLogoUrl)
  } else if (xmlText.includes('<rss') || xmlText.includes('<channel')) {
    // RSS feed
    return parseRssFeed(xmlText, sourceId, sourceLogoUrl)
  } else {
    throw new Error(`Unknown feed format for ${sourceId}`)
  }
}
