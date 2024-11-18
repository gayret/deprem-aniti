'use client'
import { useEffect } from 'react'

export default function Notice({ data }) {
  const { clientWidth, clientHeight } = document.documentElement

  function getRandomPosition() {
    const x = Math.random() * (clientWidth - 100) // Genişlik içinde rastgele X
    const y = Math.random() * (clientHeight - 100) // Yükseklik içinde rastgele Y
    return { x, y }
  }

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const a = document.createElement('a')
      a.classList.add('notice')
      a.innerText = data[i].name.length > 30 ? data[i].name.slice(0, 30) + '...' : data[i].name
      if (data[i].link) a.href = data[i].link

      const { x, y } = getRandomPosition()
      a.style.left = `${x}px`
      a.style.top = `${y}px`

      container.appendChild(a)
    }
  })

  return <div id='container'></div>
}
