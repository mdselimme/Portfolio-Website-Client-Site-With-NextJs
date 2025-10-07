import Footer from "@/components/modules/Footer/footer-04";
import Navbar from "@/components/modules/Navbar/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
