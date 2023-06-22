import {FlatList, Modal} from "react-native";
import {Text} from "../Text";
import {Product} from "../../types/Product";
import {
    Image,
    CloseButton,
    ModalBody,
    Header,
    IngredientsContainer,
    Ingredient,
    Footer,
    FooterContainer,
    PriceContainer
} from "./styles"
import {Close} from "../Icons/Close";
import {formatCurrency} from "../../utils/formatCurrency";
import {Button} from "../Button";

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: Product | null;
}

export function ProductModal({visible, onClose, product}: ProductModalProps) {

    if (!product) {
        return null;
    }

    return (
        <Modal
            onRequestClose={onClose}
            animationType="slide"
            presentationStyle="pageSheet"
            visible={visible}
        >
            <Image
                source={{
                    uri: `http://192.168.100.72:3001/uploads/${product.imagePath}`,
                }}
            >
                <CloseButton onPress={onClose}>
                    <Close/>
                </CloseButton>
            </Image>
            <ModalBody>
                <Header>
                    <Text size={24} weight={600}>
                        {product.name}
                    </Text>
                    <Text color="#666" style={{marginTop: 8}}>
                        {product.description}
                    </Text>
                </Header>
                {product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text weight="600" color="#666">Ingredientes</Text>
                        <FlatList
                            style={{marginTop: 16}}
                            data={product.ingredients}
                            keyExtractor={ingredient => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item: ingredient}) => (
                                <Ingredient>
                                    <Text style={{marginRight: 20}}>{ingredient.icon}</Text>
                                    <Text size={14} color="#666">{ingredient.name}</Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>
            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight={600}>{formatCurrency(product.price)}</Text>
                    </PriceContainer>
                    <Button onPress={() => alert("adicionar ao pedido")}>
                        Adicionar ao pedido
                    </Button>
                </FooterContainer>
            </Footer>
        </Modal>
    );
}