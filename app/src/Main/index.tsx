import {Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer} from "./styles";
import {Header} from "../components/Header";
import {Categories} from "../components/Categories";
import {Menu} from "../components/Menu";
import {Button} from "../components/Button";
import {TableModal} from "../components/TableModal";
import {useState} from "react";
import {Cart} from "../components/Cart";
import {CartItem} from "../types/CartItem";
import {Product} from "../types/Product";
import {ActivityIndicator} from "react-native";
import {products as MockProducts} from "../mocks/products";
import {Empty} from "../components/Icons/Empty";
import {Text} from "../components/Text";


export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>(MockProducts);
    function handleAddToCart(product: Product){
        if(!selectedTable){
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id );
            if(itemIndex < 0){
                return prevState.concat({
                    quantity: 1,
                    product,
                });
            }
            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex] = {
                ...item,
                quantity: newCartItems[itemIndex].quantity + 1
            };
            return newCartItems;
        });
    }

    function handleDecrementCartItem(product: Product){
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                cartItems => cartItems.product._id === product._id
            );
            const item = prevState[itemIndex];
            const newCartItems = [...prevState];
            if(item.quantity === 1){
                newCartItems.splice(itemIndex, 1);
                return newCartItems;
            }
            newCartItems[itemIndex] = {
                ...item,
                quantity: newCartItems[itemIndex].quantity - 1
            };
            return newCartItems;
        });
    }

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable("");
        setCartItems([]);
    }

    return (
        <>
            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading &&(
                    <CenteredContainer>
                        <ActivityIndicator color="#D73035" size={"large"}  />
                    </CenteredContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories/>
                        </CategoriesContainer>
                        {products.length > 0 ? (
                            <MenuContainer>
                                <Menu
                                    products={products}
                                    onAddToCart={handleAddToCart} />
                            </MenuContainer>
                        ) : (
                            <CenteredContainer>
                                <Empty />
                                <Text style={{marginTop: 24}} color="#666">nenhum produto foi encontrado</Text>
                            </CenteredContainer>
                        )}

                    </>
                )}
            </Container>
            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}
                        >
                            Novo Pedido
                        </Button>
                    )}
                    {selectedTable && (
                        <Cart
                            onConfirmOrder={handleResetOrder}
                            onAdd={handleAddToCart}
                            cartItems={cartItems}
                            onDecrement={handleDecrementCartItem}
                        />
                    )}
                </FooterContainer>
            </Footer>
        </>
    );
}