export class ScoreSheet {

    private _playerId: bigint | undefined
    private _upperSection: (number | null)[]
    private _lowerSection: (number | null)[]

    public constructor() {
        this._playerId = undefined
        this._upperSection = [null, null, null, null, null, null, null]
        this._lowerSection = [null, null, null, null, null, null]
    }

    public get playerId(): bigint | undefined {
        return this._playerId
    }

    public set playerId(playerId: bigint) {
        this._playerId = playerId
    }

    public get upperSection(): (number | null)[] {
        return this._upperSection;
    }

    public get lowerSection(): (number | null)[] {
        return this._lowerSection;
    }

    public get upperSubTotal(): number {
        let subTotal: number = 0, filled: number = 0

        for (let i = 0; i < 6; i++)
            if (this._upperSection[i] !== null) {
                filled++
                subTotal += this._upperSection[i]!
            }


        if (filled === 6)
            if (subTotal >= 63)
                this._upperSection[6] = 35
            else
                this._upperSection[6] = 0

        return subTotal
    }

    public get upperTotal(): number {
        return this.upperSubTotal + (this.upperSection[6] !== null ? this.upperSection[6] : 0)
    }

    public get lowerTotal(): number {
        let total = 0

        for (let i = 0; i < 6; i++)
            if (this._lowerSection[i] !== null)
                total += this._lowerSection[i]!

        return total
    }

    public get total(): number {
        return this.upperTotal + this.lowerTotal
    }

    public checkTotal(): boolean {
        return true
    }
}