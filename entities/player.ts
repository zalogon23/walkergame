import { Display } from "./display"
type Direction = "left" | "right" | "up" | "down"
type Movement = "idle" | "walk"
interface MovementObject {
  name: Movement
  frames: number
}

export class Player {
  x: number
  y: number
  w: number
  h: number
  currentMovement: Movement = "idle"
  movements: MovementObject[] = [
    { name: "idle", frames: 12 },
    { name: "walk", frames: 18 },
  ]
  frame = 0
  orientation = "right"
  img = new Image()
  spriteW = 720
  spriteH = 480
  constructor(x: number, y: number, w: number, h: number, url: string) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.img.src = url
  }
  draw(display: Display) {
    this.frame++
    const horizontalStarting = getHorizontalSpriteStart(this)
    const verticalStarting = getVerticalSpriteStart(this)
    display.ctx.drawImage(this.img, horizontalStarting, verticalStarting, this.spriteW, this.spriteH, display.disphaseX, display.disphaseY, this.w, this.y)

    function getVerticalSpriteStart(player: Player) {
      let verticalFrame = player.movements.findIndex(mov => mov.name === player.currentMovement) * 2
      if (player.orientation !== "right") verticalFrame++
      return verticalFrame * player.spriteH
    }
    function getHorizontalSpriteStart(player: Player) {
      return player.frame % (player.movements.find(mov => mov.name === player.currentMovement) as MovementObject).frames * player.spriteW
    }
  }
}