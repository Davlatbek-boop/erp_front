import React, { useEffect, useState } from "react";
import { Button, Card, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { courseService, groupService } from "@service";
import type { Group, Course, GetGroups } from "@types";
import { Outlet, useNavigate } from "react-router-dom";
import AddGroupModal from "./modal";
import { PageHeader } from "@ant-design/pro-layout";
import { FiTrash } from "react-icons/fi";

interface DataType {
  key: string;
  title: string;
  description: string;
  duration: number;
  lesson_duration: string;
  price: number;
  start_date: string;
  end_date: string;
  group_name: string;
  students: number;
  teachers: number;
  tags: string[];
}

const Group: React.FC = () => {
  const [, setGroups] = useState<GetGroups[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const navigate = useNavigate();

  const toOneGroup = (id: number) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupRes, courseRes] = await Promise.all([
          groupService.getGroups(),
          courseService.getCourses(),
        ]);

        const groupData: GetGroups[] = groupRes?.data?.data || [];
        const courseData: Course[] = courseRes?.data?.courses || [];
        setGroups(groupData);
        setCourses(courseData);

        // group + course ma’lumotlarini birlashtirish
        const mergedData: DataType[] = groupData.map((group) => {
          const course = courseData.find((c) => c.id == group?.course_id);

          return {
            key: String(group.id),
            title: course?.title || "Nomaʼlum",
            description: course?.description || "",
            duration: Number(course?.duration) || 0,
            lesson_duration: course?.lesson_duration || "",
            price: course?.price || 0,
            start_date: group.start_date || "",
            end_date: group.end_date || "",
            group_name: group.name || "",
            students: group.students?.length || 0,
            teachers: group.teachers?.length || 0,
            tags: ["group"], // kerak bo‘lsa boshqa taglar ham yozing
          };
        });

        setTableData(mergedData);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchData();
  }, []);

  const deleteGroup = async (id: string) => {
    try {
      await groupService.deleteOneGroup(id);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
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
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") color = "volcano";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Siz rostdan ham ushbu guruhni o‘chirmoqchimisiz?"
            onConfirm={() => deleteGroup(record.key)}
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

        <AddGroupModal courses={courses} setGroup={setGroups} />
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ margin: 24 }}
        rowClassName="hover:bg-green-50 cursor-pointer"
        onRow={(record) => ({
          onClick: () => toOneGroup(Number(record.key)),
        })}
      />

      <Outlet />
    </div>
  );
};

export default Group;
