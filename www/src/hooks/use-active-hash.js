import { useEffect, useState } from "react"

export const useActiveHash = (itemIds, rootMargin = undefined) => {
  const [activeHash, setActiveHash] = useState(``)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) {
          setActiveHash(``)
          return
        }

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id)
          }
        })
      },
      { rootMargin: rootMargin || `0% 0% -80% 0%` }
    )

    itemIds.forEach(id => {
      observer.observe(document.querySelector(`#${id}`))
    })

    return () => {
      itemIds.forEach(id => {
        observer.unobserve(document.querySelector(`#${id}`))
      })
    }
  }, [])

  useEffect(() => {
    if (activeHash) {
      window.history.replaceState(null, null, `#${activeHash}`)
    } else {
      // Remove hash from URL if none is in view
      window.history.replaceState(null, null, ` `)
    }
  }, [activeHash])

  return activeHash
}
