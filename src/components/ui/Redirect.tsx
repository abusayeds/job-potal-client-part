"use client"
import React from 'react';
import { useMyContext } from '../MyContext';
import { authPayloads } from '@/constants/others.constants';

const Redirect = ({ redirect }: any) => {
    console.log(redirect);
    const { setIsAuthOpen, setAuthTitleData } = useMyContext()
    if (redirect) {
        setAuthTitleData({ ...authPayloads["Log In"], redirect: redirect });
        setIsAuthOpen(true);
    }
    return (
        <>
        
        </>
    );
}

export default Redirect;
