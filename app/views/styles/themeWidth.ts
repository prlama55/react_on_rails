export interface FieldWidth {
  small: string
  medium: string
  large: string
  [key: string]: string
}

const fieldWidth: FieldWidth = {
  small: '80%',
  medium: '90%',
  large: '100%'
}

export default fieldWidth
