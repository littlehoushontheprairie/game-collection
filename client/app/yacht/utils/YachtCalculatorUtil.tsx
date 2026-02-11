export class YachtCalculatorUtil {

    public static add(num: number, dice: number[], hold: number[]): number {
        let total: number = 0

        for (let i = 0; i < dice.length; i++) {
            if (dice[i] === num)
                total += num
        }

        for (let i = 0; i < hold.length; i++) {
            if (hold[i] === num)
                total += num
        }

        return total
    }

    public static addAll(dice: number[], hold: number[]): number {
        let total: number = 0

        for (let i = 0; i < dice.length; i++) {
            total += dice[i]
        }

        for (let i = 0; i < hold.length; i++) {
            total += hold[i]
        }

        return total
    }
}