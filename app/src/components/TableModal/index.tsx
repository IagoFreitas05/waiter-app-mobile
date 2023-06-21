import {Modal, TouchableOpacity, Platform} from "react-native";
import {Text} from "../Text";
import {Overlay, ModalBody, ModalHeader, ModalForm, Input} from "./styles";
import {Close} from "../Icons/Close";
import {Button} from "../Button";
import {useState} from "react";
interface TableModalProps{
    visible: boolean;
    onClose: () => void;
    onSave: (table: string) => void;
}
export function TableModal({visible, onClose, onSave} : TableModalProps){
    const [table, setTable] = useState("");
    function handleSave(){
        onSave(table);
        onClose();
    }
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
                <ModalBody>
                    <ModalHeader>
                        <Text weight={600}>
                            Informe a mesa
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666" />
                        </TouchableOpacity>
                    </ModalHeader>
                    <ModalForm>
                        <Input
                            placeholder="Número da mesa"
                            placeholderTextcolor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />

                        <Button disabled={table.length === 0} onPress={handleSave}>
                            Salvar
                        </Button>
                    </ModalForm>
                </ModalBody>
            </Overlay>
        </Modal>
    )
}