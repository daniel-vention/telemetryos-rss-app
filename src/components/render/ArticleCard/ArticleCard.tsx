import type { Article } from '../../../types'
import './ArticleCard.css'

interface ArticleCardProps {
  /** Article to display */
  article: Article
}

/**
 * ArticleCard - Displays headline and summary for an article
 * 
 * Optimized for 10-20 foot viewing with large typography and high contrast
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <h1 className="article-card__title">{article.title}</h1>
      <p className="article-card__description">{article.description}</p>
    </div>
  )
}
