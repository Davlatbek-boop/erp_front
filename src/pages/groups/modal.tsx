import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Course, GetGroups } from "@types";
import { useCourses } from "@hooks";

interface Props {
  open: boolean;
  title: string;
  onCancel: () => void;
  openModal: () => void;
  onSubmit: (values: GetGroups) => void;
  initialValues: GetGroups | null;
  updateGroup: (values: GetGroups, id: number) => void;
  id: number | undefined;
}

const { Option } = Select;

const AddGroupModal = ({
  open,
  title,
  onSubmit,
  onCancel,
  openModal,
  initialValues,
  updateGroup,
  id,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        start_date: initialValues.start_date
          ? dayjs(initialValues.start_date)
          : null,
        end_date: initialValues.end_date ? dayjs(initialValues.end_date) : null,
      };
      form.setFieldsValue(formattedValues);
    } else {
      form.resetFields(); // 🔄 yangi qo‘shishda formni tozalash
      // onCancel();
    }
  }, [initialValues, open]);

  const [courses, setCourses] = useState<Course[]>([]);
  const { data } = useCourses();

  useEffect(() => {
    if (data?.data.courses) {
      setCourses(data.data.courses);
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((values: GetGroups) => {
      if (initialValues) {
        // console.log("asdfasdf", values, id);
        updateGroup(values, id!);
        // console.log("valuesss", values);
      } else {
        onSubmit(values);
      }
      form.resetFields();
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={openModal}
        >
          Add Group
        </Button>
      </div>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="add_group_form"
          autoComplete="off"
        >
          <Form.Item
            label="Group Name"
            name="name"
            rules={[{ required: true, message: "Please input group name!" }]}
          >
            <Input placeholder="Name..." />
          </Form.Item>

          <Form.Item
            label="Course"
            name="course_id"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select placeholder="Select course...">
              {courses.map((course: Course) => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status...">
              <Option value="new">New</Option>
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[{ required: true, message: "Please pick start date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="end_date"
            rules={[{ required: true, message: "Please pick end date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddGroupModal;
