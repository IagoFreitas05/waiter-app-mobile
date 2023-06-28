import {FlatList, TouchableOpacity} from "react-native";
import {CartItem} from "../../types/CartItem";
import {
    Actions,
    Item,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Summary, TotalContainer
} from "./styles";
import {Text} from "../Text";
import {formatCurrency} from "../../utils/formatCurrency";
import {PlusCircle} from "../Icons/PlusCircle";
import {MinusCircle} from "../Icons/MinusCircle";
import {Button} from "../Button";
import {Product} from "../../types/Product";
import {OrderConfirmModal} from "../OrderConfirmModal";
import {useState} from "react";
import {api} from "../../utils/api";


interface cartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string;
}

export function Cart({cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable}: cartProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const total = cartItems.reduce( (acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    function handleConfirmOrder(){
        setIsLoading(true);
        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItems) => ({
                product: cartItems.product._id,
                quantity: cartItems.quantity
            }))
        };

        api.post("/orders", payload);
        setIsLoading(false);
        setIsModalVisible(true);
    }

    function handleOk(){
        onConfirmOrder();
        setIsModalVisible(false);
    }

    return (
        <>
            <OrderConfirmModal onOk={() => handleOk()} visible={isModalVisible} />
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{marginBottom: 20, maxHeight: 150}}
                    renderItem={({item: cart}) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://192.168.100.72:3001/uploads/${cart.product.imagePath}`,
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">
                                        {cart.quantity}x
                                    </Text>
                                </QuantityContainer>
                                <ProductDetails>
                                    <Text size={14} weight={600}>{cart.product.name}</Text>
                                    <Text size={14} style={{marginTop: 14}}
                                          color="#666">{formatCurrency(cart.product.price)}</Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity
                                    onPress={() => onAdd(cart.product)}
                                    style={{marginRight: 24}}>
                                    <PlusCircle/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onDecrement(cart.product)}>
                                    <MinusCircle/>
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">{formatCurrency(total)}</Text>
                        </>
                    ) : (
                        <Text color="#999">Seu carrinho está vazio</Text>
                    )}

                </TotalContainer>
                <Button
                    onPress={handleConfirmOrder}
                    loading={isLoading}
                    disabled={cartItems.length === 0}>
                    Confirmar Pedido
                </Button>
            </Summary>
        </>
    );
}