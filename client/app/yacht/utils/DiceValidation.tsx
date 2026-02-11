export class DiceValidation {
    private readonly _frequency: Map<number, number>

    public constructor(dice: number[], hold: number[]) {
        this._frequency = new Map([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]])

        for (let i = 0; i < dice.length; i++) {
            this._frequency.set(dice[i], this._frequency.get(dice[i])! + 1)
        }

        for (let i = 0; i < hold.length; i++) {
            this._frequency.set(hold[i], this._frequency.get(hold[i])! + 1)
        }
    }

    public isFourOfAKind(): boolean {
        for (let i = 1; i <= 6; i++) {
            if (this._frequency.get(i)! >= 4)
                return true
        }

        return false
    }

    public isFullHouse(): boolean {
        let hasThree: boolean = false, hasTwo: boolean = false

        for (let i = 1; i <= 6; i++) {
            if (this._frequency.get(i) === 2)
                hasTwo = true

            if (this._frequency.get(i) === 3)
                hasThree = true
        }

        return hasTwo && hasThree
    }

    public isSmallStraight(): boolean {
        const stack: number[] = []

        for (let i = 1; i <= 6; i++) {
            if (i < 5 && this._frequency.get(i) == 0)
                stack.length = 0
            else if (this._frequency.get(i)! >= 1)
                stack.push(this._frequency.get(i)!)
        }

        return stack.length > 3
    }

    public isLargeStraight(): boolean {
        for (let i = 2; i <= 5; i++) {
            if (this._frequency.get(i) !== 1)
                return false
        }

        return this._frequency.get(1) === 1 || this._frequency.get(6) === 1
    }

    public isYacht(): boolean {
        for (let i = 1; i <= 6; i++) {
            if (this._frequency.get(i) === 5)
                return true
        }

        return false
    }
}