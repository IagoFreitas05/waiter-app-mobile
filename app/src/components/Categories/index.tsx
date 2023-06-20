import {categories} from "../../mocks/categories"
import {Category, Icon} from "./styles";
import {Text} from "../Text";
import {FlatList} from "react-native"
export function Categories(){
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            keyExtractor={category => category._id}
            contentContainerStyle={{paddingRight: 24}}
            renderItem={({item: category}) => (
            <Category>
                <Icon>
                    <Text>{category.icon}</Text>
                </Icon>
                <Text size={14} weight={600}>{category.name}</Text>
            </Category>
        )} />
    );
}