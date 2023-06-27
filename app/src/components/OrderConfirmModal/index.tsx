import {Modal} from "react-native";
import {Container, OkButton} from "./styles";
import {CheckCircle} from "../Icons/CheckCircle";
import {Text} from "../Text";


interface OrderConfirmModalProps {
    visible: boolean;
    onOk: () => void;
}

export function OrderConfirmModal({visible, onOk}: OrderConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
        >
            <Container>
                <CheckCircle/>
                <Text style={{marginTop: 12}} size={20} weight="600" color="#fff">Pedido confirmado</Text>
                <Text style={{marginTop: 4}} color="#fff" opacity={0.9}> O pedido já entrou na fila de produção</Text>

                <OkButton onPress={onOk}>
                    <Text weight="600" color="#D73035">OK</Text>
                </OkButton>
            </Container>
        </Modal>
    )
}