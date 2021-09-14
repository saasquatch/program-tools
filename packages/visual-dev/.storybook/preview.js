import { DocsPage, DocsContainer } from "@storybook/addon-docs"
import '../src/styles.css'

export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  options: {
    enableShortcuts: false
  }
}
