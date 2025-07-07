// import { groupService } from "@service";
// import { useEffect, useState } from "react";
// import AdminGroups from "../../components/admin-groups";
// import type { GetGroups, Group } from "@types";
// import AddGroupModal from "./modal";
// import { courseService } from "@service";
// import { Outlet, useNavigate } from "react-router-dom";

// const Groups = () => {
//   const [group, setGroup] =useState<Group[]>([])
//   const [courses, setCourses] = useState([])
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await groupService.getGroups();
//         setGroup(res?.data.data || []);
//       } catch (error) {
//         console.error("Xatolik:", error);
//       }
//     };

//     fetchData();
//   }, []);

//    useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await courseService.getCourses();
//         setCourses(res?.data.courses || []);
//       } catch (error) {
//       }
//     };

//     fetchData();
//   }, []);

//   const toOneGroup = (id:number) =>{
//     navigate(`${id}`)
//   }

//  return (
//   <div className="p-6 max-w-7xl mx-auto">
//     <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Group List</h1>

//     <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//       <table className="min-w-full table-auto border-collapse">
//         <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
//           <tr>
//             <th className="px-4 py-3 border">Title</th>
//             <th className="px-4 py-3 border">Description</th>
//             <th className="px-4 py-3 border">Duration</th>
//             <th className="px-4 py-3 border">Lesson Duration</th>
//             <th className="px-4 py-3 border">Price</th>
//             <th className="px-4 py-3 border">Start Date</th>
//             <th className="px-4 py-3 border">End Date</th>
//             <th className="px-4 py-3 border">Group Name</th>
//             <th className="px-4 py-3 border">Students</th>
//             <th className="px-4 py-3 border">Teachers</th>
//             <th className="px-4 py-3 border">Teachers</th>
//           </tr>
//         </thead>

//         <tbody className="text-sm text-gray-800">
//           {group.map((item: GetGroups) => (
//             <AdminGroups key={item.id} item={item} toOneGroup={toOneGroup} />
//           ))}
//         </tbody>
//       </table>

//     </div>
//           <AddGroupModal courses={courses} setGroup={setGroup}/>
//           <Outlet/>
//   </div>
// );

// };

// export default Groups;

import React, { useEffect, useState } from "react";
import { Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { courseService, groupService } from "@service";
import type { Group, Course, GetGroups } from "@types";
import { Outlet, useNavigate } from "react-router-dom";
import AddGroupModal from "./modal";

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
  const [groups, setGroups] = useState<GetGroups[]>([]);
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
  }, [groups, courses]);

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
        <button
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
        >
          Delete
        </button>
      </Popconfirm>
    </Space>
  ),
}

  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Group List
        </h1>
        <AddGroupModal courses={courses} setGroup={setGroups} />
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5 }}
        bordered
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
