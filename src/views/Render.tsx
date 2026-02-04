import { NewsFeedsContainer } from '../components'
import { useSubtitleStoreState, useUiScaleStoreState } from '../hooks/store'
import { DEFAULT_CONFIG } from '../types'
import wordMarkPath from '../../assets/telemetryos-wordmark.svg'
import './Render.css'

/**
 * Render - Entry point for the news feeds render view
 * 
 * Kept thin and declarative per cursor rules.
 * Main logic and UI scaling handled by NewsFeedsContainer.
 */
export function Render() {
  const [, uiScale] = useUiScaleStoreState()
  const [isLoading, subtitle] = useSubtitleStoreState()

  // TODO: Replace with actual config from instance storage
  const config = DEFAULT_CONFIG

  return (
    <NewsFeedsContainer uiScale={uiScale} config={config} isLoading={isLoading}>
      <div className="render">
        <img src={wordMarkPath} alt="TelemetryOS" className="render__logo" />
        <div className="render__hero">
          {uiScale < 1.5 && (
            <div className="render__hero-title">Welcome to TelemetryOS SDK</div>
          )}
          <div className="render__hero-subtitle">{isLoading ? 'Loading...' : subtitle}</div>
        </div>
        <div className="render__docs-information">
          {uiScale < 1.2 && (
            <>
              <div className="render__docs-information-title">
                To get started, edit the Render.tsx and Settings.tsx files
              </div>
              <div className="render__docs-information-text">
                Visit our documentation on building applications to learn more
              </div>
            </>
          )}
          {uiScale < 1.35 && (
            <a
              className="render__docs-information-button"
              href="https://docs.telemetryos.com/docs/sdk-getting-started"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          )}
        </div>
      </div>
    </NewsFeedsContainer>
  )
}
