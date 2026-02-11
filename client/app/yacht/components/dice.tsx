import Die from "../../common/components/die"
import styles from "../../page.module.css"

export default function Dice({ dice, handleClick }: { dice: number[], handleClick: any }) {
    return (
        <div>
            {
                dice.map((die: number, index: number) =>
                    <span key={`die-${index}`} onClick={() => handleClick(index)} className={styles.die}>
                        <Die dieNumber={die} size={64} />
                    </span>
                )
            }
        </div>
    )
}