import {Container, Content, OrderHeader, Table} from "./styles";
import {Text} from "../Text";
import {TouchableOpacity} from "react-native";

interface HeaderProps {
    selectedTable: string;
    onCancelOrder: () => void;
}

export function Header({selectedTable, onCancelOrder}: HeaderProps) {
    return (
        <Container>
            {!selectedTable && (
                <>
                    <Text opacity={0.9} size={14}>Bem vindo(a) ao</Text>
                    <Text size={24} weight={700}>WAITER
                        <Text size={24}>APP</Text>
                    </Text>
                </>
            )}
            {selectedTable && (
                <>
                    <Content>
                        <OrderHeader>
                            <Text
                                size={24}
                                weight={600}
                            >
                                Pedido
                            </Text>
                            <TouchableOpacity onPress={onCancelOrder}>
                                <Text
                                    size={14}
                                    weight={600}
                                    color="#d73035">
                                    Cancelar pedido
                                </Text>
                            </TouchableOpacity>
                        </OrderHeader>

                        <Table>
                            <Text color="#666">Mesa {selectedTable}</Text>
                        </Table>
                    </Content>
                </>
            )}
        </Container>
    );
}