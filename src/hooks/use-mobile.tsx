import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check for actual mobile device using touch capabilities and userAgent
    const checkIfMobile = () => {
      // Screen width check
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT
      
      // Touch capability check
      const hasTouchCapability = 'ontouchstart' in window || 
                               navigator.maxTouchPoints > 0 ||
                               (navigator as any).msMaxTouchPoints > 0

      // UserAgent check for mobile devices
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent)
      
      // Consider mobile when width is small AND either touch is available or mobile userAgent
      return isMobileWidth && (hasTouchCapability || isMobileUserAgent)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(checkIfMobile())
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(checkIfMobile())
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
