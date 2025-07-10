import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useCourses } from "@hooks";
import type { Course } from "@types";
import CourseModal from "./modal";

const CourseTable = () => {
  const { data, useCourseCreate, useCourseDelete, useCourseUpdate } =
    useCourses();
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [id, setId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Course");

  const openModal = () => {
    console.log("object");
    setModalTitle("Add Course");
    setCourse(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourse(null);
  };

  const { mutate: createMutate } = useCourseCreate();

  const handleSubmit = (values: Course) => {
    // console.log("Formdan kelgan qiymatlar:", values);
    createMutate({
      ...values,
      lessons_in_a_week: +values.lessons_in_a_week,
    });
    setIsModalOpen(false);
    // mutate(values) — agar create API bo‘lsa shu yerda ishlatiladi
  };

  useEffect(() => {
    if (data?.data?.courses) {
      setCourses(data.data.courses);
    }
  }, [data]);

  const { mutate: deleteMutate } = useCourseDelete();

  const deleteGroup = (id: number) => {
    deleteMutate(id);
  };

  const editCourse = (course: Course) => {
    // console.log(course);
    setModalTitle("Update Course");
    setCourse(course);
    setId(course.id!);
    setIsModalOpen(true);
  };

  const { mutate: updateMutate } = useCourseUpdate();

  const updateCourse = (course: Course, id: number) => {
    // console.log(course);
    updateMutate({ id, data: course });
    closeModal();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Lesson Duration",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
    },
    {
      title: "Lessons/Week",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} so'm`,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) =>
        is_active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Course) => (
        <Space size="middle">
          <Button
            onClick={() => editCourse(record)}
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
    <>
      <div className="flex justify-between items-center px-6 mt-6">
        <PageHeader
          title="Courses List"
          subTitle="Barcha kurslar ro'yxati"
          className="bg-white px-4 py-2 rounded-md shadow"
          extra={[]}
        />
        {/* <Button type="primary">Add Course</Button> */}
        <CourseModal
          open={isModalOpen}
          title={modalTitle}
          onCancel={closeModal}
          onSubmit={handleSubmit}
          updateCourse={updateCourse}
          openModal={openModal}
          initialValues={course}
          id={id}
        />
      </div>

      <Table
        dataSource={courses.map((course) => ({ ...course, key: course.id }))}
        columns={columns}
        bordered
        style={{ margin: 24 }}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default CourseTable;
