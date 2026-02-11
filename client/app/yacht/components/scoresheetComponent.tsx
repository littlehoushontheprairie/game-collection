"use client"

import { OverlayTrigger, Table, Tooltip } from "react-bootstrap"
import { ScoreSheet } from "../entities/ScoreSheet"
import { LowerSection, Section, UpperSection } from "../entities/enums/SectionEnums"
import Die from "@/app/common/components/die"

export default function ScoreSheetComponent({ scoreSheet, handleClick }: { scoreSheet: ScoreSheet, handleClick: Function }) {
    return (
        <>
            <Table bordered={true}>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Your Score</th>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement={'top'} overlay={<Tooltip id={`tooltip-aces}`}>Total of all 1s</Tooltip>}>
                                <span>Aces <Die dieNumber={1} size={15} /></span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.ONES)}>
                            {scoreSheet.upperSection[UpperSection.ONES]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement={'top'} overlay={<Tooltip id={`tooltip-dueces}`}>Total of all 2s</Tooltip>}>
                                <span>Dueces <Die dieNumber={2} size={15} /></span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.TWOS)}>
                            {scoreSheet.upperSection[UpperSection.TWOS]}
                        </td>
                    </tr>
                    <tr>
                        <td>Threes <Die dieNumber={3} size={15} /></td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.THREES)}>
                            {scoreSheet?.upperSection[UpperSection.THREES]}
                        </td>
                    </tr>
                    <tr>
                        <td>Fours <Die dieNumber={4} size={15} /></td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.FOURS)}>
                            {scoreSheet.upperSection[UpperSection.FOURS]}
                        </td>
                    </tr>
                    <tr>
                        <td>Fives <Die dieNumber={5} size={15} /></td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.FIVES)}>
                            {scoreSheet.upperSection[UpperSection.FIVES]}
                        </td>
                    </tr>
                    <tr>
                        <td>Sixes <Die dieNumber={6} size={15} /></td>
                        <td onClick={() => handleClick(Section.UPPER, UpperSection.SIXES)}>
                            {scoreSheet.upperSection[UpperSection.SIXES]}
                        </td>
                    </tr>
                    <tr>
                        <th>Upper Subtotal</th>
                        <td>
                            <span className={scoreSheet.upperSubTotal >= 63 ? 'text-success' : ''}>{scoreSheet.upperSubTotal}</span> / 63
                        </td>
                    </tr>
                    <tr>
                        <td>+35 Bonus</td>
                        <td> + {scoreSheet.upperSection[UpperSection.BONUS]}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={2}>Bonus if <Die dieNumber={1} size={15} /> - <Die dieNumber={6} size={15} /> are over 63 points.</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-choice'>Total of all dice</Tooltip>}>
                                <span>Choice</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.CHOICE)}>
                            {scoreSheet?.lowerSection[LowerSection.CHOICE]}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-4-of-a-kind'>Four of the same number</Tooltip>}>
                                <span>4 of a Kind</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.FOUR_OF_A_KIND)}>
                            {scoreSheet.lowerSection[LowerSection.FOUR_OF_A_KIND]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-full-house'>3 of a kind + 2 of a kind</Tooltip>}>
                                <span>Full House</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.FULL_HOUSE)}>
                            {scoreSheet.lowerSection[LowerSection.FULL_HOUSE]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-sm-straight'>Four numbers in ascending order</Tooltip>}>
                                <span>Small Straight</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.SMALL_STRAIGHT)}>
                            {scoreSheet.lowerSection[LowerSection.SMALL_STRAIGHT]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-lg-straight'>Five numbers in ascending order</Tooltip>}>
                                <span>Large Straight</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.LARGE_STRAIGHT)}>
                            {scoreSheet.lowerSection[LowerSection.LARGE_STRAIGHT]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-yacht'>Five of the same number</Tooltip>}>
                                <span>Yacht</span>
                            </OverlayTrigger>
                        </td>
                        <td onClick={() => handleClick(Section.LOWER, LowerSection.YACHT)}>
                            {scoreSheet.lowerSection[LowerSection.YACHT]}
                        </td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{scoreSheet.total}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}