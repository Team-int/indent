import Typography from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

delete fairyGatesTheme.googleFonts

const typography = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
