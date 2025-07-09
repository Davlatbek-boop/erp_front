import type { ColumnsType } from "antd/es/table";
import type { Branch } from "../../types";
import { Button, Popconfirm, Space, Table } from "antd/lib";
import { useBranch } from "../../hooks/useBranch";
import BranchModal from "./modal";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { PageHeader } from "@ant-design/pro-layout";

const columns: ColumnsType<Branch> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Call Number",
    dataIndex: "call_number",
    key: "call_number",
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (_: any, record: Branch) => (
      <Space size="middle">
        <Button
          // onClick={() => editCourse(record)}
          style={{
            color: "#1890ff",
            borderColor: "#1890ff",
            fontWeight: 500,
            borderRadius: "6px",
            padding: "6px 16px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#1890ff";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#fff";
            (e.currentTarget as HTMLButtonElement).style.color = "#1890ff";
          }}
          icon={<FiEdit />}
        ></Button>

        <Popconfirm
          title="Siz rostdan ham ushbu guruhni o‘chirmoqchimisiz?"
          // onConfirm={() => deleteGroup(record.id)}
          okText="Ha"
          cancelText="Yo‘q"
        >
          <Button
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "6px 16px",
              backgroundColor: "#fff",
              color: "red",
              border: "1px solid red",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "red";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "red";
            }}
            icon={<FiTrash />}
          ></Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const Branch = () => {
  const { data, useBranchCreate } = useBranch();

  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const { mutate: createMutate } = useBranchCreate();

  const handleSubmit = (values: Branch) => {
    console.log(values);
    createMutate(values);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 mt-6">
        <PageHeader
          title="Branches List"
          subTitle="Barcha filiallar ro'yxati"
          className="bg-white px-4 py-2 rounded-md shadow"
          extra={[]}
        />
        <BranchModal
          open={isOpen}
          title="Add Branch"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          handleAdd={handleAdd}
        />
      </div>
      <Table
        dataSource={data?.data.branch.map((item: Branch) => ({
          ...item,
          key: item.id,
        }))}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
        style={{ margin: 24 }}
      />
    </>
  );
};

export default Branch;
