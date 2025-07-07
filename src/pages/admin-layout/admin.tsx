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
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "group", icon: <PieChartOutlined />, label: "Groups" },
  { key: "course", icon: <PieChartOutlined />, label: "Courses" },
];

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
    <div style={{ width: 256, height: "100%", background: "#001529" }}>
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
        style={{ height: "calc(100vh - 64px)", borderRight: 0 }}
      />
    </div>
    <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
      <Outlet />
    </div>
  </div>
  );
};

export default Admin;
