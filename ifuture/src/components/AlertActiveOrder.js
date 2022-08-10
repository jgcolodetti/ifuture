import React, { useContext } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useOutsideClick
} from '@chakra-ui/react'
import { GlobalContext } from './global/GlobalContext';

export default function AlertActiveOrder({ setAlertActiveOrder }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const ref = React.useRef()
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    useOutsideClick({
        ref: ref,
        handler: () => setAlertActiveOrder(false),
    })

    return (
        <>
            <Modal isOpen={onOpen} autoFocus isCentered={true} size={'sm'} ref={ref}>
                <ModalOverlay/>
                <ModalContent alignItems={'center'} fontFamily={'Roboto'} justifyContent={'center'} w={'90%'}>
                    <ModalBody fontSize={'1.2rem'} paddingY={'40px'} color={'#e8222e'}>
                        Aguarde o pedido em andamento.
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}