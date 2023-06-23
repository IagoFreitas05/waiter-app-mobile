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


interface cartProps {
    cartItems: CartItem[];
}

export function Cart({cartItems}: cartProps) {
    return (
        <>
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
                                <TouchableOpacity style={{marginRight: 24}}>
                                    <PlusCircle/>
                                </TouchableOpacity>
                                <TouchableOpacity>
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
                            <Text size={20} weight="600">{formatCurrency(120)}</Text>
                        </>
                    ) : (

                        <Text color="#999">Seu carrinho está vazio</Text>
                    )}

                </TotalContainer>
                <Button disabled={cartItems.length === 0} onPress={() => alert("confirmar pedido")}>Confirmar Pedido</Button>
            </Summary>
        </>
    );
}