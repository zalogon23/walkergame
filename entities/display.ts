export class Display {
  w = 600
  h = 450
  disphaseX: number
  disphaseY: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(charWidth: number, charHeight: number) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.disphaseX = this.canvas.width / 2 - charWidth / 2
    this.disphaseY = this.canvas.height / 2 - charHeight / 2
  }
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }
}