"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 600, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.8

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    // Major city lights (bright)
    const majorCityLights = [
      { name: "Houston", coords: [-95.3698, 29.7604] },
      { name: "Chicago", coords: [-87.6298, 41.8781] },
      { name: "Dubai", coords: [55.2708, 25.2048] },
      { name: "London", coords: [-0.1276, 51.5074] },
      { name: "Seoul", coords: [126.9780, 37.5665] },
      { name: "Vilnius", coords: [25.2797, 54.6872] },
      { name: "Bogota", coords: [-74.0721, 4.7110] }
    ]

    const generateDotsInPolygon = (feature: any, dotSpacing = 20) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
      isMajorCity?: boolean
      cityName?: string
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) with gradient
      const gradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, 0,
        containerWidth / 2, containerHeight / 2, currentScale
      )
      gradient.addColorStop(0, "#1e1b4b")
      gradient.addColorStop(0.7, "#0f172a")
      gradient.addColorStop(1, "#000000")

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = gradient
      context.fill()
      context.strokeStyle = "#22c55e"
      context.lineWidth = 2 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#22c55e"
        context.lineWidth = 0.5 * scaleFactor
        context.globalAlpha = 0.2
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#3b82f6"
        context.lineWidth = 1.5 * scaleFactor
        context.stroke()

        // Draw city lights with different intensities
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            
            if (dot.isMajorCity) {
              // Major cities - bright, large, with glow effect
              const radius = 4 * scaleFactor
              
              // Create glow effect
              const glowGradient = context.createRadialGradient(
                projected[0], projected[1], 0,
                projected[0], projected[1], radius * 3
              )
              glowGradient.addColorStop(0, "#fbbf24")
              glowGradient.addColorStop(0.3, "#f59e0b")
              glowGradient.addColorStop(0.7, "#d97706")
              glowGradient.addColorStop(1, "transparent")
              
              // Draw glow
              context.beginPath()
              context.arc(projected[0], projected[1], radius * 3, 0, 2 * Math.PI)
              context.fillStyle = glowGradient
              context.globalAlpha = 0.6
              context.fill()
              
              // Draw bright center
              context.beginPath()
              context.arc(projected[0], projected[1], radius, 0, 2 * Math.PI)
              context.fillStyle = "#fbbf24"
              context.globalAlpha = 1
              context.fill()
              
              // Add city name label for major cities
              if (dot.cityName && scaleFactor > 0.8) {
                context.font = `${12 * scaleFactor}px Inter, sans-serif`
                context.fillStyle = "#fbbf24"
                context.textAlign = "center"
                context.globalAlpha = 0.9
                context.fillText(dot.cityName, projected[0], projected[1] - (radius * 2 + 8))
              }
            } else {
              // Regular dots - much dimmer and smaller
              context.arc(projected[0], projected[1], 1 * scaleFactor, 0, 2 * Math.PI)
              context.fillStyle = "#22c55e"
              context.globalAlpha = 0.15 // Much dimmer
              context.fill()
            }
            
            context.globalAlpha = 1
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        // Add major city lights first
        majorCityLights.forEach((city) => {
          allDots.push({ 
            lng: city.coords[0], 
            lat: city.coords[1], 
            visible: true, 
            isMajorCity: true, 
            cityName: city.name 
          })
        })

        // Add regular dots from land features (much dimmer)
        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 30) // Increased spacing for fewer dots
          dots.forEach(([lng, lat]) => {
            // Skip if too close to a major city to avoid overlap
            const tooCloseToMajorCity = majorCityLights.some(city => {
              const distance = Math.sqrt(
                Math.pow(city.coords[0] - lng, 2) + Math.pow(city.coords[1] - lat, 2)
              )
              return distance < 5 // 5 degree threshold
            })
            
            if (!tooCloseToMajorCity) {
              allDots.push({ lng, lat, visible: true, isMajorCity: false })
            }
          })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    // Set up rotation and interaction
    const rotation = [0, 0]
    let autoRotate = true
    const rotationSpeed = 0.3

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    const rotationTimer = d3.timer(rotate)

    const centerOnCity = (cityCoords: [number, number]) => {
      autoRotate = false
      const targetRotation = [-cityCoords[0], -cityCoords[1]]
      const startRotation = [...rotation]
      const duration = 1000 // 1 second animation
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3)
        
        rotation[0] = startRotation[0] + (targetRotation[0] - startRotation[0]) * eased
        rotation[1] = startRotation[1] + (targetRotation[1] - startRotation[1]) * eased
        
        projection.rotate(rotation)
        render()
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setTimeout(() => {
            autoRotate = true
          }, 2000)
        }
      }
      
      animate()
    }

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      // Check if click is on a major city
      const clickedCity = majorCityLights.find(city => {
        const projected = projection([city.coords[0], city.coords[1]])
        if (projected) {
          const distance = Math.sqrt(
            Math.pow(projected[0] - x, 2) + Math.pow(projected[1] - y, 2)
          )
          return distance < 20 // 20px click radius
        }
        return false
      })
      
      if (clickedCity) {
        centerOnCity(clickedCity.coords)
        return
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      // Check if it's a click (no movement) or drag
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]
      let isDragging = false

      const handleMouseMove = (moveEvent: MouseEvent) => {
        isDragging = true
        autoRotate = false
        
        const sensitivity = 0.3
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = (upEvent: MouseEvent) => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        if (!isDragging) {
          // This was a click, not a drag
          handleCanvasClick(upEvent)
        } else {
          setTimeout(() => {
            autoRotate = true
          }, 2000)
        }
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 2.5, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)

    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black/40 rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">Error loading Earth visualization</p>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
          <div className="text-white/60 text-sm">Loading Earth...</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute bottom-4 left-4 text-xs text-white/40 px-3 py-2 rounded-md bg-black/40 backdrop-blur-sm">
        Drag to rotate • Scroll to zoom • Click cities to center
      </div>
    </div>
  )
}