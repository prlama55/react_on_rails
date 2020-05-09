interface PaletteIntention {
  main: string
  light?: string
  dark?: string
  contrastText?: string
}

interface Palette {
  primary: PaletteIntention
  secondary: PaletteIntention
  error: PaletteIntention
}

const palette: Palette = {
  primary: {
    main: '#84C249'
  },
  secondary: {
    main: '#81D5D1',
    light: '#F5F5F5',
    dark: '#41423f'
  },
  error: {
    main: '#f44336'
  }
}

export default palette
