// utils/LayoutWrapper.js
"use client";

import { AddToCartProvider } from "@/contexts/addToCartContext";
import { AuthProvider } from "@/contexts/authContext";
import { MobileMenuProvider } from "@/contexts/mobileMenuContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <AddToCartProvider>
        <MobileMenuProvider>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            theme="colored"
            position="top-right"
          />
          {children}
        </MobileMenuProvider>
      </AddToCartProvider>
    </AuthProvider>
  );
};

export default LayoutWrapper;