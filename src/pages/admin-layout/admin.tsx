// import { Outlet } from "react-router-dom";

// const Admin = () => {
//   return (
//     <div>

//     </div>
//   );
// };

// export default Admin;

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { FiLogOut  } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { FaGraduationCap, FaBuilding  } from "react-icons/fa";
import { getItem, removeItem } from "../../helpers";
import { authService } from "../../service";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "group", icon: <MdGroups  />, label: "Groups" },
  { key: "course", icon: <FaGraduationCap />, label: "Courses" },
  { key: "branch", icon: <FaBuilding  />, label: "Branches" },
];

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
      // Logout logikasini shu yerda yozing
      const role = getItem("role");
      await authService.signOut(role!);
      removeItem("access_token");
      navigate("/");
    };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
       
    <div style={{ width: collapsed ? "80px" : "15%", height: "100vh", background: "#001529", transition: "width 0.4s ease" }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ margin: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["group"]}
        mode="inline"
        theme="dark"
        onClick={({key})=> navigate(key)}
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: "calc(100vh - 70px)", borderRight: 0 }}
      />
    </div>
    <div style={{ flex: 1, padding: 0, overflow: "auto" }}>
      <Layout>
        <Header
          style={{
            background: "#001529",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: "24px",
            height: "70px",
          }}
        >
          <h1 style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            Admin Panel
          </h1>

          <Button type="primary" danger onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </Button>
        </Header>
      </Layout>


      <Outlet />
      
    </div>
    
  </div>
  );
};

export default Admin;
