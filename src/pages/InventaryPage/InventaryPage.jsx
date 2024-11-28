/** @jsxImportSource @emotion/react */
import React from 'react';
import tw from 'twin.macro';
import InventaryComponent from '../../components/InventaryComponent/InventaryComponent';

const PageContainer = tw.div`min-h-screen bg-gray-100 p-8`;
const PageTitle = tw.h1`text-4xl font-bold mb-6 text-center text-gray-900`;

const InventaryPage = () => {
  return (
    <PageContainer>
      <PageTitle>Página de Inventario</PageTitle>
      <InventaryComponent />
    </PageContainer>
  );
};

export default InventaryPage;
