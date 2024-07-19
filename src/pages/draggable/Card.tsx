import { useEffect, useRef } from 'react'
import { CardType } from './Draggable'

interface CardProps extends CardType {
  updateStorageonMouseUp: () => void
}

export default function Card({ x, y, color, updateStorageonMouseUp }: CardProps) {
  let startX = x
  let startY = y
  const cardRef = useRef<HTMLDivElement>(null)
  let isSelected = false

  useEffect(() => {
    if (!cardRef.current) return

    const box = cardRef.current
    const container = document.querySelector('.container') as HTMLDivElement

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

      if(container.offsetWidth-(400+box.offsetWidth) < box.offsetLeft + diffX || box.offsetLeft + diffX < 0) return
      if(container.offsetHeight-box.offsetHeight < box.offsetTop + diffY || box.offsetTop + diffY < 0) return

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
      id='abcd'
      className='draggable-card'
      style={{
        top: startY + 'px',
        left: startX + 'px',
        backgroundColor: color,
      }}
    ></div>
  )
}
