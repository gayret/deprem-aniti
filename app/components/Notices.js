'use client'
import { useEffect } from 'react'
export default function Notice({ data }) {
  const setSize = (element, name) => {
    const count = data.filter((item) => item.name === name).length
    if (count >= 2 && count <= 5) element.classList.add('normal-size')
    if (count > 5 && count <= 10) element.classList.add('medium-size')
    if (count > 10 && count <= 15) element.classList.add('large-size')
    if (count > 15 && count <= 20) element.classList.add('x-large-size')
    if (count > 20 && count <= 25) element.classList.add('xx-large-size')
    if (count > 25) element.classList.add('xxx-large-size')
  }

  useEffect(() => {
    // array'deki tekrarlayan elemanları kaldır
    let localData = data.reduce((acc, current) => {
      if (!acc.find((item) => item.name === current.name)) {
        acc.push(current)
      }
      return acc
    }, [])

    // size atama
    for (let i = 0; i < localData.length; i++) {
      const a = document.createElement('a')
      a.classList.add('notice')
      a.innerText =
        localData[i].name.length > 30 ? localData[i].name.slice(0, 30) + '...' : localData[i].name
      if (localData[i].link) a.href = localData[i].link

      setSize(a, localData[i].name)

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

      // sadece koyu renkler
      function generateDarkColor() {
        let r, g, b
        do {
          r = Math.floor(Math.random() * 255)
          g = Math.floor(Math.random() * 255)
          b = Math.floor(Math.random() * 255)
        } while ((r + g + b) / 3 > 100) // Ortalama parlaklık düşük olana kadar döner

        return `rgba(${r}, ${g}, ${b}, 1)`
      }

      a.style.backgroundColor = generateDarkColor()
      const angle = Math.floor(Math.random() * 10)
      a.style.transform = `rotate(${angle}deg)`

      const container = document.getElementById('container')

      const { clientWidth, clientHeight } = document.documentElement

      // rastgele pozisyon
      const getRandomPosition = () => {
        const x = Math.floor(Math.random() * (clientWidth - 100))
        const y = Math.floor(Math.random() * (clientHeight - 100))
        return { x, y }
      }

      const { x, y } = getRandomPosition()
      a.style.left = `${x}px`
      a.style.top = `${y}px`

      container.appendChild(a)
    }
  })

  return <div id='container'></div>
}
