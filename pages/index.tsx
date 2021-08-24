import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Background } from '../entities/background'
import { Display } from '../entities/display'
import { Player } from '../entities/player'
import { handleKeyDown, handleKeyUp } from '../lib/keyhandlers'

const Home: NextPage = () => {
  useEffect(() => {
    const charWidth = 190
    const charHeight = 150
    const display = new Display(charWidth, charHeight)
    const player = new Player(display.disphaseX + 400, display.disphaseY + 400, charWidth, charHeight, "/hero.png", display)
    const background = new Background(display.ctx)
    document.addEventListener("keydown", (e) => handleKeyDown(e, player))
    document.addEventListener("keyup", (e) => handleKeyUp(e, player))
    loop()
    function loop() {
      display.clear()
      background.draw(player, display)
      player.draw(display)
      requestAnimationFrame(loop)
    }
  }, [])
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontFamily: "sans-serif", textAlign: "center", display: "block" }}>Juego elegante</h1>
      <canvas style={{border: "1px solid black", borderRadius: "10px"}} id="canvas" />
    </main>
  )
}

export default Home
