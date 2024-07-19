import './draggable.css'
import Card from './Card'
import { useEffect, useState } from 'react'

export interface CardType {
  x: number
  y: number
}

export default function Draggable() {
  const [cards, SetCards] = useState<CardType[]>([
    {
      x: 0,
      y: 0,
    },
    {
      x: 20,
      y: 10,
    },
  ])

  useEffect(() => {
    const cards = localStorage.getItem('cards')
    if(cards){
      SetCards(JSON.parse(cards) as CardType[])
    }
  }, [])

  const updateStorageonMouseUp = () => {
    const allCards = document.querySelectorAll('.draggable-card') as NodeListOf<HTMLDivElement>
    const modifiedCards = Array.from(allCards).map(card => {
      const x = card.offsetLeft
      const y = card.offsetTop
      return {x, y}
    })
    localStorage.setItem('cards', JSON.stringify(modifiedCards  ))
    SetCards(modifiedCards)
  }

  return (
    <div className='container'>
      {
        cards.map((card, index) => <Card key={index} {...card}  updateStorageonMouseUp={updateStorageonMouseUp}/>)
      }
    </div>
  )
}
