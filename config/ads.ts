import { TestIds } from "react-native-google-mobile-ads"

export default {
  interstitialUnitID: __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-7522835953441908/8521965490",
  bannerUnitID: __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : "ca-app-pub-7522835953441908/2006326906",
  BUTTON_AMOUNT_PRESSED_LIMIT_TO_SHOW_AD: 5 as const,
}
