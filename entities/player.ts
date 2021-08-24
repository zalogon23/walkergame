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
  checkBoxX: number
  checkBoxY: number
  checkBoxW: number
  checkBoxH: number
  currentMovement: Movement = "idle"
  movements: MovementObject[] = [
    { name: "idle", frames: 12 },
    { name: "walk", frames: 18 },
  ]
  pressedDirs: Direction[] = []
  frame = 0
  speed = 4
  orientation = "right"
  img = new Image()
  display: Display
  spriteW = 720
  spriteH = 480
  constructor(x: number, y: number, w: number, h: number, url: string, display: Display) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.checkBoxX = w / 3 + x
    this.checkBoxY = h / 5 + y
    this.checkBoxH = h / 5 * 3.7
    this.checkBoxW = w / 3
    this.img.src = url
    this.display = display
  }
  draw(display: Display) {
    this.update()
    const horizontalStarting = getHorizontalSpriteStart(this)
    const verticalStarting = getVerticalSpriteStart(this)
    // The checkbox
    // display.ctx.fillRect(this.checkBoxX - this.x + display.disphaseX, this.checkBoxY - this.y + display.disphaseY, this.checkBoxW, this.checkBoxH)
    display.ctx.drawImage(this.img, horizontalStarting, verticalStarting, this.spriteW, this.spriteH, display.disphaseX, display.disphaseY, this.w, this.h)

    function getVerticalSpriteStart(player: Player) {
      let verticalFrame = player.movements.findIndex(mov => mov.name === player.currentMovement) * 2
      if (player.orientation !== "right") verticalFrame++
      return verticalFrame * player.spriteH
    }
    function getHorizontalSpriteStart(player: Player) {
      return player.frame % (player.movements.find(mov => mov.name === player.currentMovement) as MovementObject).frames * player.spriteW
    }
  }
  update() {
    this.frame++
    const validDirs = getValidDirs(this.pressedDirs)
    validDirs.map(dir => move(dir, this))

    function getValidDirs(dirs: readonly Direction[]): Direction[] {
      const firstMovement = dirs[0]
      let validDirs = [...dirs]
      switch (firstMovement) {
        case "left": { validDirs = validDirs.filter(dir => dir !== "right"); break }
        case "right": { validDirs = validDirs.filter(dir => dir !== "left"); break }
        case "up": { validDirs = validDirs.filter(dir => dir !== "down"); break }
        case "down": { validDirs = validDirs.filter(dir => dir !== "up"); break }
      }
      if (validDirs.length > 2) validDirs.length = 2
      return validDirs
    }
    function move(dir: Direction, player: Player) {
      if (dir === "left") player.orientation = "left"
      if (dir === "right") player.orientation = "right"
      switch (dir) {
        case "down":
          player.y += player.speed
          player.checkBoxY += player.speed
          break
        case "up":
          player.y -= player.speed
          player.checkBoxY -= player.speed
          break
        case "right":
          player.x += player.speed
          player.checkBoxX += player.speed
          break
        case "left":
          player.x -= player.speed
          player.checkBoxX -= player.speed
          break
      }
    }
  }
}