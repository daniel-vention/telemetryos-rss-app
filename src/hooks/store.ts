import { createUseInstanceStoreState } from '@telemetryos/sdk/react'
import type { RssFeed } from '../types'
import type { TransitionStyle } from '../types'
import { DEFAULT_CONFIG } from '../types'

export const useUiScaleStoreState = createUseInstanceStoreState<number>('ui-scale', 1)

export const useSubtitleStoreState = createUseInstanceStoreState<string>('subtitle', 'Change this line in settings ⚙️ ↗️')

export const useRssFeedsStoreState = createUseInstanceStoreState<RssFeed[]>('rssFeeds', [])

export const useSelectedFeedsStoreState = createUseInstanceStoreState<string[]>('selectedFeeds', DEFAULT_CONFIG.selectedFeeds)

export const useArticleDurationStoreState = createUseInstanceStoreState<number>('articleDurationSec', DEFAULT_CONFIG.articleDurationSec)

export const useRefreshIntervalStoreState = createUseInstanceStoreState<number>('refreshIntervalMin', DEFAULT_CONFIG.refreshIntervalMin)

export const useTransitionStyleStoreState = createUseInstanceStoreState<TransitionStyle>('transitionStyle', DEFAULT_CONFIG.transitionStyle)
