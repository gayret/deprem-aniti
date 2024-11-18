'use client'
import { useEffect } from 'react'
export default function Notice({ data }) {
  useEffect(() => {
    const { clientWidth, clientHeight } = document.documentElement

    function getRandomPosition() {
      const x = Math.random() * (clientWidth - 100)
      const y = Math.random() * (clientHeight - 100)
      return { x, y }
    }

    for (let i = 0; i < data.length; i++) {
      const a = document.createElement('a')
      a.classList.add('notice')
      a.innerText = data[i].name.length > 30 ? data[i].name.slice(0, 30) + '...' : data[i].name
      if (data[i].link) a.href = data[i].link

      const { x, y } = getRandomPosition()
      a.style.left = `${x}px`
      a.style.top = `${y}px`

      // çakışma kontrolü
      const notices = document.querySelectorAll('.notice')
      notices.forEach((notice) => {
        if (
          a.getBoundingClientRect().top < notice.getBoundingClientRect().bottom &&
          a.getBoundingClientRect().bottom > notice.getBoundingClientRect().top &&
          a.getBoundingClientRect().left < notice.getBoundingClientRect().right &&
          a.getBoundingClientRect().right > notice.getBoundingClientRect().left
        ) {
          const { x, y } = getRandomPosition()
          a.style.left = `${x}px`
          a.style.top = `${y}px`
        }
      })

      // rastgele renk atama
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      a.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`

      const angle = Math.floor(Math.random() * 10)
      a.style.transform = `rotate(${angle}deg)`

      const container = document.getElementById('container')
      container.appendChild(a)
    }
  })

  return <div id='container'></div>
}
