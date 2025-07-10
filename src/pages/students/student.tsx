import { Table, Tag, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiEdit, FiTrash } from "react-icons/fi";
import type { CreateStudent, GetStudents } from "@types";
import { useStudents } from "../../hooks/useStudents";
import StudentModal from "./modal";
import { useState } from "react";
import { PageHeader } from "@ant-design/pro-layout";

const Student = () => {
  const { data, useStudentCreate } = useStudents();
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const onCancel = () => setOpen(false);
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const { mutate: createMutate } = useStudentCreate();

  const createStudent = (student: CreateStudent) => {
    console.log(student);
    createMutate(student);
    onCancel()
  };

  const columns: ColumnsType<GetStudents> = [
    {
      title: "👤 Full Name",
      key: "fullName",
      render: (_, user) => (
        <span style={{ fontWeight: "bold", color: "#1677ff" }}>
          {user.first_name} {user.last_name}
        </span>
      ),
    },
    {
      title: "📧 Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "📞 Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "⚧ Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (
        <Tag color={gender === "male" ? "blue" : "magenta"}>{gender}</Tag>
      ),
    },
    {
      title: "🟢 Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean) =>
        active ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "📚 Groups",
      key: "groups",
      render: (_, student) => (
        <Space wrap>
          {student.groups.map((group) => (
            <Tag color="geekblue" key={group.id}>
              {group.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "⚙️ Action",
      key: "action",
      render: () => (
        <Space>
          <Button type="link" icon={<FiEdit />} />
          <Button danger type="link" icon={<FiTrash />} />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center px-2 mt-1 mb-2">
        <PageHeader
          title="Student List"
          subTitle="Barcha Studentlar ro'yxati"
          className="bg-white px-2 py-3 rounded-md shadow"
          extra={[]}
        />
        <Button type="primary" onClick={showModal}>
          Add Student
        </Button>
        <StudentModal open={open} onCancel={onCancel} onSubmit={onSubmit} createStudent={createStudent} />
      </div>
      <Table
        columns={columns}
        dataSource={data?.data.students.map((student: GetStudents) => ({
          ...student,
          key: student.id,
        }))}
        pagination={{ pageSize: 10 }}
        bordered
        rowClassName="hover:bg-slate-50"
      />
    </div>
  );
};

export default Student;
