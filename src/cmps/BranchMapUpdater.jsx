import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

export function BranchMapUpdater({ center }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, 12) // zoom level 12 is good for cities
  }, [center])

  return null
}