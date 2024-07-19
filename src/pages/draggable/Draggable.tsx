import './draggable.css'
import Card from './Card'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

export interface CardType {
  color: string
  x: number
  y: number
}

export default function Draggable() {
  const [cards, SetCards] = useState<CardType[]>([])

  useEffect(() => {
    const cards = localStorage.getItem('cards')
    if (cards) {
      SetCards(JSON.parse(cards) as CardType[])
    }
  }, [])

  const updateStorageonMouseUp = () => {
    const allCards = document.querySelectorAll('.draggable-card') as NodeListOf<HTMLDivElement>
    const modifiedCards = Array.from(allCards).map((card) => {
      const x = card.offsetLeft
      const y = card.offsetTop
      return { x, y, color: card.style.backgroundColor }
    })
    localStorage.setItem('cards', JSON.stringify(modifiedCards))
    SetCards(modifiedCards)
  }

  const newBoxAdded = (e: React.DragEvent<HTMLDivElement>) => {
    const color = e.dataTransfer.getData('color')
    const newCards = [
      ...cards,
      {
        color,
        x: e.clientX - 25,
        y: e.clientY - 25,
      },
    ]
    SetCards(newCards)
    localStorage.setItem('cards', JSON.stringify(newCards))
  }

  return (
    <>
      <Sidebar />
      <div onDragOver={(e) => e.preventDefault()} onDrop={newBoxAdded} className='container'>
        {cards.map((card, index) => (
          <Card key={index} {...card} updateStorageonMouseUp={updateStorageonMouseUp} />
        ))}
      </div>
    </>
  )
}
