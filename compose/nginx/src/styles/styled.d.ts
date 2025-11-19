import 'styled-components'
import type { AppTheme } from './themes'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {
    /**
     * Auxiliary field to comply with lint rule requiring at least one member.
     * This field should never be used at runtime.
     */
    readonly _?: never
  }
}
