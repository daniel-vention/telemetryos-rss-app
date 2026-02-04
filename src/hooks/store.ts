import { createUseInstanceStoreState } from '@telemetryos/sdk/react'
import type { RssFeed } from '../types'

export const useUiScaleStoreState = createUseInstanceStoreState<number>('ui-scale', 1)

export const useSubtitleStoreState = createUseInstanceStoreState<string>('subtitle', 'Change this line in settings ⚙️ ↗️')

export const useRssFeedsStoreState = createUseInstanceStoreState<RssFeed[]>('rssFeeds', [])
