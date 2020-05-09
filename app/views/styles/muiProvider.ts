import { Theme } from '@material-ui/core/styles'
import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme'
import palette from './palette'
import { FieldWidth } from './themeWidth'

export interface ExtendedTheme extends Theme {
  field: FieldWidth
}
export interface ExtendedOptions extends ThemeOptions {
  field: FieldWidth
}

export default (options?: ExtendedOptions) =>
  createMuiTheme({
    typography: { fontFamily: 'IntervalSansPro' },
    palette: palette,
    ...options,
    overrides: {
      MuiInputLabel: {
        root: {
          '&$disabled': {
            color: palette.primary.main
          }
        }
      }
    }
  })
