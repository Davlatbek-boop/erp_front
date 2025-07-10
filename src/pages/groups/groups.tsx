import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import type { Group, GetGroups } from "@types";
import { Outlet } from "react-router-dom";
import AddGroupModal from "./modal";
import { PageHeader } from "@ant-design/pro-layout";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useGroup } from "@hooks";

const Group: React.FC = () => {
  const [groups, setGroups] = useState<GetGroups[]>([]);
  const { data, useGroupDelete, useGroupUpdate, useGroupCreate } = useGroup();
  const [modalTitle, setModalTitle] = useState("Add Group");
  const [group, setGroup] = useState<GetGroups | null>(null);
  const [id, setId] = useState<number>();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setModalTitle("Add Group")
    setGroup(null)
    setOpen(true)
  }
  const handleCancel = () => {
    setGroup(null)
    setOpen(false);
  }

  useEffect(() => {
    if (data?.data.data) {
      setGroups(data.data.data);
    }
  }, [data]);


  const { mutate: createMutate } = useGroupCreate()


  const handleSubmit = (values: GetGroups) => {
    // console.log(values);
      createMutate(values);
      setOpen(false);
    };

  const { mutate: mutateUpdate } = useGroupUpdate();

  const updateGroup = (group: GetGroups, id: number) => {
      // console.log(course);
      mutateUpdate({ id, data: group });
      handleCancel();
    };

  const editGroup = (group: GetGroups) => {
    console.log("group1", group);

    setModalTitle("Update Group");
    setGroup(group);
    setId(group.id);
    setOpen(true);
  };

  const { mutate: deleteMutate } = useGroupDelete();

  const deleteGroup = async (id: number) => {
    try {
      deleteMutate(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Lesson Duration",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    { title: "Group Name", dataIndex: "group_name", key: "group_name" },
    { title: "Students", dataIndex: "students", key: "students" },
    { title: "Teachers", dataIndex: "teachers", key: "teachers" },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") color = "volcano";
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: GetGroups) => (
        <Space size="middle">
          <Button
            onClick={() => editGroup(record)}
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
            onConfirm={() => deleteGroup(record.id!)}
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
    <div>
      <div className="flex justify-between items-center px-6 mt-6">
        <PageHeader
          title="Group List"
          subTitle="Barcha guruhlar ro'yxati"
          className="bg-white px-4 py-2 rounded-md shadow"
          extra={[]}
        />

        <AddGroupModal
          open={open}
          title={modalTitle}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          updateGroup={updateGroup}
          openModal={showModal}
          initialValues={group}
          id={id}
        />
      </div>

      <Table<GetGroups>
        columns={columns}
        dataSource={groups.map((group) => ({
          ...group,
          title: group.course?.title,
          description: group.course?.description,
          duration: group.course?.duration,
          lesson_duration: group.course?.lesson_duration,
          price: group.course?.price,
          group_name: group.name,
          teachers: group.teachers.length,
          students: group.students.length,
          key: group.id,
        }))}
        pagination={{ pageSize: 10 }}
        bordered
        style={{ margin: 24 }}
        rowClassName="hover:bg-green-50 cursor-pointer"
      />

      <Outlet />
    </div>
  );
};

export default Group;
