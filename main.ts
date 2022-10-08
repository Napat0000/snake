function Touchedge () {
    if (Phead.get(LedSpriteProperty.Direction) == 0 && Phead.get(LedSpriteProperty.Y) == 0) {
        Death()
    }
    if (Phead.get(LedSpriteProperty.Direction) == 90 && Phead.get(LedSpriteProperty.X) == 4) {
        Death()
    }
    if (Phead.get(LedSpriteProperty.Direction) == 180 && Phead.get(LedSpriteProperty.Y) == 4) {
        Death()
    }
    if (Phead.get(LedSpriteProperty.Direction) == 270 && Phead.get(LedSpriteProperty.X) == 0) {
        Death()
    }
}
input.onButtonPressed(Button.A, function () {
    Phead.turn(Direction.Left, 90)
})
function Death () {
    game.setScore(Score)
    game.gameOver()
}
input.onButtonPressed(Button.B, function () {
    Phead.turn(Direction.Right, 90)
})
let Score = 0
let Phead: game.LedSprite = null
Phead = game.createSprite(1, 0)
let Pbody = [game.createSprite(0, 0)]
let Pbx: number[] = []
let Pby: number[] = []
let PBdir: number[] = []
let Eated = false
let Snakelength = 1
let Snakespeed = 1000
Score = 0
game.setScore(0)
let Food = game.createSprite(randint(0, 4), randint(0, 4))
Food.set(LedSpriteProperty.Blink, 100)
Pbx.unshift(Phead.get(LedSpriteProperty.X))
Pby.unshift(Phead.get(LedSpriteProperty.Y))
PBdir.unshift(Phead.get(LedSpriteProperty.Direction))
basic.forever(function () {
    for (let index = 0; index <= Snakelength; index++) {
        if (index > 0) {
            Pbody[index - 1].set(LedSpriteProperty.X, Pbx[index])
            Pbody[index - 1].set(LedSpriteProperty.Y, Pby[index])
            Pbody[index - 1].set(LedSpriteProperty.Brightness, 100)
            if (Pbody[index - 1].isTouching(Food)) {
                Food.set(LedSpriteProperty.X, randint(0, 4))
                Food.set(LedSpriteProperty.Y, randint(0, 4))
            }
            if (Pbody[index - 1].isTouching(Phead)) {
                Death()
            }
        }
    }
})
basic.forever(function () {
    Phead.move(1)
    Pbx.unshift(Phead.get(LedSpriteProperty.X))
    Pby.unshift(Phead.get(LedSpriteProperty.Y))
    PBdir.unshift(Phead.get(LedSpriteProperty.Direction))
    if (Phead.isTouching(Food)) {
        Food.delete()
        Food = game.createSprite(randint(0, 4), randint(0, 4))
        Food.set(LedSpriteProperty.Blink, 100)
        Score += 1
        Snakelength += 1
        Pbody.unshift(game.createSprite(Pbx[Snakelength], Pby[Snakelength]))
    }
    basic.pause(Snakespeed)
    Touchedge()
})
