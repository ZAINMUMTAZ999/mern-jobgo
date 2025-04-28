// import React from "react";
// import Header from "../components/Header";
// type Props = {
//   children: React.ReactNode;
// };

// const HomeLayout = ({ children }: Props) => {
//   return (
//     <>
//       <div className="">
//         <Header />
//         {children}
//       </div>
//     </>
//   );
// };
// export default HomeLayout;
import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
