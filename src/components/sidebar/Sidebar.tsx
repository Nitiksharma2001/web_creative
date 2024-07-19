import './sidebar.css'
export default function Sidebar() {
  const items = ['red', 'blue', 'green']

  return (
    <div className='sidebar'>
      {items.map((item) => (
        <div draggable key={item} onDragStart={(e) => e.dataTransfer.setData('color', item)}>
          {item}
        </div>
      ))}
    </div>
  )
}
