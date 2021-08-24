import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Background } from '../entities/background'
import { Display } from '../entities/display'
import { Player } from '../entities/player'

const Home: NextPage = () => {
  useEffect(() => {
    const charWidth = 190
    const charHeight = 150
    const display = new Display(charWidth, charHeight)
    const player = new Player(display.disphaseX, display.disphaseY, charWidth, charHeight, "/hero.png")
    const background = new Background(display.ctx)
    loop()
    function loop() {
      display.clear()
      background.draw(player, display)
      player.draw(display)
      requestAnimationFrame(loop)
    }
  }, [])
  return (
    <main>
      <h1>Juego elegante</h1>
      <canvas id="canvas" />
    </main>
  )
}

export default Home
