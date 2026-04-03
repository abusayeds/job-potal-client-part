"use client";

import { mainTheme } from "@/lib/antTheme";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ConfigProvider theme={mainTheme}>
        {/* Uncomment the AuthProvider if you want to use it */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </ConfigProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default Providers;

const AuthProvider = ({ children }: ProvidersProps) => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetProfileQuery(undefined); 
    // const { data: favoriteData } = useMyFavoriteQuery(undefined); 
    // console.log(favoriteData?.data?.saveData)
    useEffect(() => {
      dispatch(
        setUser({
          user: data?.data,
        })
      );
    }, [data]);
    if (isLoading) {
      return (
        <div className="min-h-screen h-full flex flex-col justify-center items-center gap-2">
          <p className="animate-pulse text-sm md:text-xl uppercase font-medium">Welcome</p>
        </div>
      );
    }
  return children;
};
