import type { Article } from '../../../types'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import { SourceBadge } from '../SourceBadge/SourceBadge'
import { TimeAgo } from '../TimeAgo/TimeAgo'
import './ArticleStage.css'

interface ArticleStageProps {
  /** Article to display */
  article: Article
  /** Source name for badge */
  sourceName?: string
  /** Whether content may be stale/offline */
  isOffline?: boolean
}

/**
 * ArticleStage - Full screen layout container for displaying a single article
 * 
 * Layout:
 * - Main content area with 2 columns (content left 4:1 image right)
 * - Footer with source badge and timestamp
 * - Optional offline indicator
 */
export function ArticleStage({ article, sourceName, isOffline = false }: ArticleStageProps) {
  return (
    <div className="article-stage">
      <div className="article-stage__main">
        <div className="article-stage__content">
          <ArticleCard article={article} />
        </div>
        <div className="article-stage__image">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} className="article-stage__image-img" />
          ) : (
            <div className="article-stage__image-placeholder">Image</div>
          )}
        </div>
      </div>
      <div className="article-stage__footer">
        <SourceBadge sourceName={sourceName || article.sourceId} logoUrl={article.sourceLogoUrl} />
        <TimeAgo timestamp={article.publishedAt} />
      </div>
      {isOffline && (
        <div className="article-stage__offline-indicator">
          Content may not be current
        </div>
      )}
    </div>
  )
}
