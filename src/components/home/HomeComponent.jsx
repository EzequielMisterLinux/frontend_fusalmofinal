import React from 'react';
import tw from 'twin.macro';
import { FaBoxes, FaTags, FaThList, FaUserFriends } from 'react-icons/fa';

// Colores de la paleta
const colors = {
    inventory: '#0568A6',
    categories: '#065473',
    subcategories: '#042F40',
    products: '#077F8C',
    users: '#38F2F2',
};

const CardContainer = tw.div`container mx-auto flex flex-wrap justify-center gap-8`;
const Card = tw.div`flex items-center justify-center p-8 bg-white shadow-xl rounded-xl cursor-pointer transition duration-300 transform hover:scale-105`;
const CardBody = tw.div`flex items-center justify-center flex-col text-center`;

// Tarjetas con colores específicos
const InventoryCard = tw(Card)`bg-blue-500`;
const CategoriesCard = tw(Card)`bg-teal-500`;
const SubcategoriesCard = tw(Card)`bg-blue-900`;
const ProductsCard = tw(Card)`bg-teal-700`;
const UsersCard = tw(Card)`bg-cyan-400`;

const Home = () => {
    return (
        <CardContainer>
            <InventoryCard
                onClick={() => (window.location.href = '/dashboard/inventary')}
                tw="w-80 m-10"
                css={{ backgroundColor: colors.inventory }}
            >
                <CardBody>
                    <FaBoxes tw="text-4xl text-white mb-2" />
                    <p tw="text-lg font-semibold text-black">Inventory</p>
                </CardBody>
            </InventoryCard>
            <CategoriesCard
                onClick={() => (window.location.href = '/dashboard/categories')}
                tw="w-80 m-10"
                css={{ backgroundColor: colors.categories }}
            >
                <CardBody>
                    <FaTags tw="text-4xl text-white mb-2" />
                    <p tw="text-lg font-semibold text-black">Categories</p>
                </CardBody>
            </CategoriesCard>
            <SubcategoriesCard
                onClick={() => (window.location.href = '/dashboard/subcategories')}
                tw="w-80 m-10"
                css={{ backgroundColor: colors.subcategories }}
            >
                <CardBody>
                    <FaThList tw="text-4xl text-white mb-2" />
                    <p tw="text-lg font-semibold text-black">SubCategories</p>
                </CardBody>
            </SubcategoriesCard>
            <ProductsCard
                onClick={() => (window.location.href = '/dashboard/products')}
                tw="w-80 m-10"
                css={{ backgroundColor: colors.products }}
            >
                <CardBody>
                    <FaBoxes tw="text-4xl text-white mb-2" />
                    <p tw="text-lg font-semibold text-black">Products</p>
                </CardBody>
            </ProductsCard>
            <UsersCard
                onClick={() => (window.location.href = '/dashboard/employees')}
                tw="w-80 m-10"
                css={{ backgroundColor: colors.users }}
            >
                <CardBody>
                    <FaUserFriends tw="text-4xl text-black mb-2" />
                    <p tw="text-lg font-semibold text-black">Users</p>
                </CardBody>
            </UsersCard>
        </CardContainer>
    );
};

export default Home;