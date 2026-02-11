"use client"

import { Card } from "react-bootstrap"
import styles from "../../page.module.css"
import PlayingCardSuit from "./playingCardSuit"

export default function PlayingCard({ cardNumber }: { cardNumber: number }) {
    let suit: number = Math.floor(cardNumber / 13)
    let rank: string

    switch (cardNumber % 13) {
        case 0:
            rank = "A"
            break
        case 10:
            rank = "J"
            break
        case 11:
            rank = "Q"
            break
        case 12:
            rank = "K"
            break
        default:
            rank = "" + ((cardNumber % 13) + 1)
    }

    return (
        <>
            <Card className='playingCard' draggable={true}>
                <Card.Body>
                    <div>
                        <PlayingCardSuit cardNumber={cardNumber} /> {rank}
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}