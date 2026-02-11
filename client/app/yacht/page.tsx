"use client"

import { Button, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import ScoreSheetComponent from "./components/scoresheetComponent"
import { ScoreSheet } from "./entities/ScoreSheet"
import Dice from "./components/dice"
import { DiceValidation } from "./utils/DiceValidation"
import { LowerSection, Section, UpperSection } from "./entities/enums/SectionEnums"
import { YachtCalculatorUtil } from "./utils/YachtCalculatorUtil"
import LowerSectionModal from "./components/lowerSectionModal"
import GameOverModal from "./components/gameOverModal"
import styles from "../page.module.css"

interface YachtGame {
    scoreSheet: ScoreSheet
    turnsLeft: number
    dice: number[]
    hold: number[]
    rollsLeft: number
    diceValidation: DiceValidation
    showInfo: boolean
    message: string | null
    showGameOver: boolean
}

export default function Page() {
    const [game, setGame] = useState<YachtGame>({ scoreSheet: new ScoreSheet(), turnsLeft: 12, dice: [], hold: [], rollsLeft: 3, diceValidation: new DiceValidation([], []), showGameOver: false, showInfo: false, message: null })

    function markScoreSheet(section: Section, index: number) {
        if (section === Section.UPPER) {
            if (game.scoreSheet.upperSection[index] !== null)
                return

            game.scoreSheet.upperSection[index] = YachtCalculatorUtil.add(index + 1, game.dice, game.hold)

            if (game.scoreSheet.upperSubTotal >= 63)
                game.scoreSheet.upperSection[UpperSection.BONUS] = 35

        } else {
            if (game.scoreSheet.lowerSection[index] !== null)
                return

            switch (index) {
                case LowerSection.CHOICE:
                    game.scoreSheet.lowerSection[index] = YachtCalculatorUtil.addAll(game.dice, game.hold)
                    break
                case LowerSection.FOUR_OF_A_KIND:
                    game.scoreSheet.lowerSection[index] =
                        game.diceValidation.isFourOfAKind() ? YachtCalculatorUtil.addAll(game.dice, game.hold) : 0
                    break
                case LowerSection.FULL_HOUSE:
                    game.scoreSheet.lowerSection[index] =
                        game.diceValidation.isFullHouse() ? YachtCalculatorUtil.addAll(game.dice, game.hold) : 0
                    break

                case LowerSection.SMALL_STRAIGHT:
                    game.scoreSheet.lowerSection[index] =
                        game.diceValidation.isSmallStraight() ? 15 : 0
                    break
                case LowerSection.LARGE_STRAIGHT:
                    game.scoreSheet.lowerSection[index] =
                        game.diceValidation.isLargeStraight() ? 30 : 0
                    break

                case LowerSection.YACHT:
                    game.scoreSheet.lowerSection[index] = game.diceValidation.isYacht() ? 50 : 0

                default:
                    break
            }
        }

        setGame({ ...game, turnsLeft: game.turnsLeft - 1, rollsLeft: 3, dice: [], hold: [] })

        if (game.turnsLeft === 0) {
            const newMessage: string = `Final score: {game.scoreSheet.total}`
            setGame({ ...game, message: newMessage, showGameOver: true })
        }
    }

    function selectDieFromDice(index: number) {
        if (game.rollsLeft === 0)
            return

        const newDice: number[] = game.dice
        const die: number = game.dice[index]
        newDice.splice(index, 1)

        game.hold.push(die)

        setGame({ ...game, dice: newDice })
    }

    function removeDieFromHold(index: number) {
        if (game.rollsLeft === 0)
            return

        const newHold: number[] = game.hold
        const die: number = newHold[index]
        newHold.splice(index, 1)

        game.dice.push(die)

        setGame({ ...game, hold: newHold })
    }

    function rollDice() {
        const newDice: number[] = []
        for (let i = 0; i < 5 - game.hold.length; i++) {
            newDice.push(Math.ceil(Math.random() * 6))
        }

        const newDiceValidation: DiceValidation = new DiceValidation(newDice, game.hold)
        let possibleNewMessage: string | null = null

        if (newDiceValidation.isYacht() && game.scoreSheet.lowerSection[LowerSection.YACHT] === null)
            possibleNewMessage = "Yacht!"
        else if (newDiceValidation.isLargeStraight() && game.scoreSheet.lowerSection[LowerSection.LARGE_STRAIGHT] === null)
            possibleNewMessage = "Large Straight!"
        else if (newDiceValidation.isSmallStraight() && game.scoreSheet.lowerSection[LowerSection.SMALL_STRAIGHT] === null)
            possibleNewMessage = "Small Straight!"
        else if (newDiceValidation.isFullHouse() && game.scoreSheet.lowerSection[LowerSection.FULL_HOUSE] === null)
            possibleNewMessage = "Full House!"
        else if (newDiceValidation.isFourOfAKind() && game.scoreSheet.lowerSection[LowerSection.FOUR_OF_A_KIND] === null)
            possibleNewMessage = "Four of a Kind!"

        setGame({ ...game, rollsLeft: game.rollsLeft - 1, dice: newDice, diceValidation: newDiceValidation, showInfo: possibleNewMessage !== null, message: possibleNewMessage })
    }

    return (
        <Container fluid className={styles.game}>
            <Row>
                <Col md={6}><ScoreSheetComponent scoreSheet={game.scoreSheet} handleClick={markScoreSheet} /></Col>
                <Col md={6}>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={rollDice} disabled={game.rollsLeft === 0 || game.hold.length === 5}>Roll</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.hold}>
                            <Dice dice={game.hold} handleClick={removeDieFromHold} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['yacht-table']}>
                            <Dice dice={game.dice} handleClick={selectDieFromDice} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <LowerSectionModal show={game.showInfo} message={game.message} handleClose={() => setGame({ ...game, showInfo: false })} />
            <GameOverModal show={game.showGameOver} message={game.message} handleClose={() => setGame({ ...game, showGameOver: false })} />
        </Container>
    )
}