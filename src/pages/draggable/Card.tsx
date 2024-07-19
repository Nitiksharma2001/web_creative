import { useEffect, useRef } from 'react'
import { CardType } from './Draggable'

interface CardProps extends CardType {
  updateStorageonMouseUp: () => void
}

export default function Card({ x, y, updateStorageonMouseUp }: CardProps) {
  let startX = x
  let startY = y
  const cardRef = useRef<HTMLDivElement>(null)
  let isSelected = false

  useEffect(() => {
    if (!cardRef.current) return

    const box = cardRef.current

    const onMouseUp = () => {
      isSelected = false
      updateStorageonMouseUp()
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isSelected) return

      const diffX = e.clientX - startX
      const diffY = e.clientY - startY

      startX = e.clientX
      startY = e.clientY

      box.style.top = box.offsetTop + diffY + 'px'
      box.style.left = box.offsetLeft + diffX + 'px'
    }
    const onMouseDown = (e: MouseEvent) => {
      isSelected = true

      startX = e.clientX
      startY = e.clientY

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    box.addEventListener('mousedown', onMouseDown)
  }, [])

  return (
    <div
      ref={cardRef}
      className='draggable-card'
      style={{
        top: startY + 'px',
        left: startX + 'px',
      }}
    ></div>
  )
}
