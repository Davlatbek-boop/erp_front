import type { ColumnsType } from "antd/es/table";
import type { Branch } from "../../types";
import { Button, Popconfirm, Space, Table } from "antd/lib";
import { useBranch } from "../../hooks/useBranch";
import BranchModal from "./modal";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { PageHeader } from "@ant-design/pro-layout";

const Branch = () => {
  const { data, useBranchCreate, useBranchDelete, useBranchUpdate } =
    useBranch();
  const [title, setTitle] = useState("Add Branch");
  const [isOpen, setIsOpen] = useState(false);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [id, setId] = useState<number>(0);

  function handleAdd() {
    setTitle("Add Branch");
    setBranch(null);
    setIsOpen(true);
  }

  const handleCancel = () => {
    setBranch(null);
    setIsOpen(false);
  };

  const { mutate: createMutate } = useBranchCreate();

  const handleSubmit = (values: Branch) => {
    console.log(values);
    createMutate(values);
    setIsOpen(false);
  };

  const { mutate: deleteMutate } = useBranchDelete();

  const deleteBranch = (id: number) => {
    deleteMutate(id);
  };

  const { mutate: updateMutate } = useBranchUpdate();

  const editBranch = (branch: Branch) => {
    setBranch(branch);
    setId(branch.id!);
    setIsOpen(true);
  };

  const updateBranch = (branch: Branch) => {
    console.log(branch);
    updateMutate({id, data: branch});
    handleCancel()
  };

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
            onClick={() => editBranch(record)}
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
            onConfirm={() => deleteBranch(record.id!)}
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
          title={title}
          initialValues={branch}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          handleAdd={handleAdd}
          updateBranch={updateBranch}
        />
      </div>
      <Table
        dataSource={data?.data.branch.map((item: Branch) => ({
          ...item,
          key: item.id,
        }))}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
        style={{ margin: 24 }}
      />
    </>
  );
};

export default Branch;
