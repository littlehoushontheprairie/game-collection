import { Button, Modal } from "react-bootstrap"

export default function LowerSectionModal({ show, handleClose, message }: { show: boolean, handleClose: any, message: string | null }) {
    return (
        <>
            <Modal show={show} scrollable={false}>
                <Modal.Header closeButton><h1>{message}</h1></Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}> Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}