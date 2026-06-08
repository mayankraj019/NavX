import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const visibilityMap = {}

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        visibilityMap[entry.target.id] = entry.intersectionRatio
      })
      // Set active to whichever section has the highest visibility ratio
      const mostVisible = Object.entries(visibilityMap)
        .sort(([,a],[,b]) => b - a)[0]
      if (mostVisible && mostVisible[1] > 0) {
        setActiveSection(mostVisible[0])
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      rootMargin: '-80px 0px -20% 0px'
    })

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) {
        visibilityMap[id] = 0
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
