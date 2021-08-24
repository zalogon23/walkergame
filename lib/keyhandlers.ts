import { Player } from "../entities/player"

type ValidCode = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "KeyW" | "KeyS" | "KeyA" | "KeyD"
type Direction = "left" | "right" | "up" | "down"

export function handleKeyDown(e: KeyboardEvent, player: Player) {
  if (!isValidCode(e.code)) return
  const dir = getDir(e.code)
  if (player.pressedDirs.includes(dir)) return
  player.pressedDirs.unshift(dir)
  if (player.currentMovement !== "walk") player.currentMovement = "walk"
}
export function handleKeyUp(e: KeyboardEvent, player: Player) {
  if (!isValidCode(e.code)) return
  const dir = getDir(e.code)
  player.pressedDirs.splice(player.pressedDirs.indexOf(dir), 1)
  if (player.pressedDirs.length === 0) player.currentMovement = "idle"
}

function isValidCode(code: string): code is ValidCode {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyS", "KeyA", "KeyD"].includes(code)
}

function getDir(code: ValidCode): Direction {
  switch (code) {
    case "ArrowUp":
    case "KeyW":
      return "up"
    case "ArrowDown":
    case "KeyS":
      return "down"
    case "ArrowLeft":
    case "KeyA":
      return "left"
    case "ArrowRight":
    case "KeyD":
      return "right"
  }
}