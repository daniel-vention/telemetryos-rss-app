import { NewsFeedsContainer } from '../components/render/NewsFeedsContainer/NewsFeedsContainer'
import { ArticleStage } from '../components/render/ArticleStage/ArticleStage'
import { EmptyState } from '../components/render/EmptyState/EmptyState'
import {
  useUiScaleStoreState,
  useSelectedFeedsStoreState,
  useArticleDurationStoreState,
  useRefreshIntervalStoreState,
  useTransitionStyleStoreState,
  useRandomStringStoreState,
} from '../hooks/store'
import type { AppConfig, Article } from '../types'
import './Render.css'

/**
 * Render - Entry point for the news feeds render view
 * 
 * Kept thin and declarative per cursor rules.
 * Main logic and UI scaling handled by NewsFeedsContainer.
 * Subscribes to instance storage to react instantly when operators modify selections.
 */
export function Render() {
  const [, uiScale] = useUiScaleStoreState()
  const [isLoadingSelected, selectedFeeds] = useSelectedFeedsStoreState()
  const [isLoadingDuration, articleDurationSec] = useArticleDurationStoreState()
  const [isLoadingInterval, refreshIntervalMin] = useRefreshIntervalStoreState()
  const [isLoadingTransition, transitionStyle] = useTransitionStyleStoreState()
  const [isLoadingRandomString, randomString] = useRandomStringStoreState()

  // Build config from instance storage - automatically subscribes to changes
  const config: AppConfig = {
    selectedFeeds,
    articleDurationSec,
    refreshIntervalMin,
    transitionStyle,
  }

  const isLoading = isLoadingSelected || isLoadingDuration || isLoadingInterval || isLoadingTransition

  // Hardcoded article for layout preview
  const dummyArticle: Article = {
    title: 'Major Breakthrough in Renewable Energy Technology',
    description: 'Scientists have developed a new solar panel technology that increases efficiency by 40% while reducing manufacturing costs. The innovation uses advanced nanomaterials to capture more sunlight throughout the day, even in cloudy conditions. This breakthrough could accelerate the global transition to clean energy.',
    link: 'https://example.com/article',
    publishedAt: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    sourceId: 'bbc',
    imageUrl: undefined, // No image for now
    sourceLogoUrl: undefined,
  }

  return (
    <NewsFeedsContainer uiScale={uiScale} config={config} isLoading={isLoading}>
      {!isLoadingSelected && selectedFeeds.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ArticleStage article={dummyArticle} sourceName="BBC" />
        </>
      )}
      <div className="random-string-container">
        sample text {isLoadingRandomString ? 'loading...' : randomString}
      </div>
      
    </NewsFeedsContainer>
  )
}
