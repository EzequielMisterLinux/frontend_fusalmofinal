import React from 'react';
import tw from 'twin.macro';
import { FaBoxes, FaTags, FaThList, FaUserFriends } from 'react-icons/fa';

const Card = tw.div`flex items-center justify-between p-4 bg-white shadow-md rounded-lg my-4`;
const CardBody = tw.div`flex items-center`;

const Home = () => {
    return (
        <div tw="container mx-auto p-6">
            <div className="row">
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <FaBoxes tw="text-3xl text-yellow-500" />
                            <a href="/dashboard/inventary" tw="ml-4 text-lg font-semibold text-black">Inventary</a>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <FaTags tw="text-3xl text-yellow-500" />
                            <a href="/dashboard/categoriesandsubcategories" tw="ml-4 text-lg font-semibold text-black">Categories</a>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <FaThList tw="text-3xl text-yellow-500" />
                            <a href="/dashboard/subcategories" tw="ml-4 text-lg font-semibold text-black">SubCategories</a>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <FaBoxes tw="text-3xl text-yellow-500" />
                            <a href="/dashboard/products" tw="ml-4 text-lg font-semibold text-black">Products</a>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <FaUserFriends tw="text-3xl text-yellow-500" />
                            <a href="/dashboard/employees" tw="ml-4 text-lg font-semibold text-black">Users</a>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;