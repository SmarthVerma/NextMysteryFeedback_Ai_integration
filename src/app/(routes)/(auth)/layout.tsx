// components/Layout.tsx
import Navbar from '@/components/tier1/Navbar';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};


export default Layout;