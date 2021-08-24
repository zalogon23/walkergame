import { Display } from "./display"
import { Player } from "./player"

export class Background {
  x = 0
  y = 0
  img = new Image()
  url = "/background.png"
  ctx: CanvasRenderingContext2D
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.img.src = this.url
  }
  draw(player: Player, disp: Display) {
    this.ctx.drawImage(this.img, this.x - player.x + disp.disphaseX, this.y - player.y + disp.disphaseY)
  }
}