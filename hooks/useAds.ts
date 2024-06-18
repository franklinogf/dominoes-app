import { useEffect } from "react"
import mobileAds from "react-native-google-mobile-ads"

export const useAds = () => {
  useEffect(() => {
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log("ads initialized: ", adapterStatuses)
      })
  }, [])
}
