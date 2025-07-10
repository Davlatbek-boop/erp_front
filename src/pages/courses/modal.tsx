import { Modal, Form, Input, InputNumber, Button, Select } from "antd";
const { Option } = Select;
import type { Course } from "@types";
import { useEffect } from "react";

interface Props {
  open: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: (values: Course) => void;
  openModal: () => void;
  initialValues: Course | null;
  updateCourse: (values: Course, id: number) => void;
  id: number;
}

const CourseModal = ({
  open,
  title,
  onCancel,
  onSubmit,
  openModal,
  initialValues,
  updateCourse,
  id,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // 🧠 course ni formga yuklash
    } else {
      form.resetFields(); // 🔄 yangi qo‘shishda formni tozalash
      // onCancel();
    }
  }, [initialValues, open]);

  const handleOk = () => {
    form.validateFields().then((values: Course) => {
      if (initialValues) {
        // console.log("asdfasdf", values, id);
        updateCourse(values, id);

        // console.log("valuesss", values);
      } else {
        onSubmit(values);
      }
      form.resetFields();
    });
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Add Course
      </Button>

      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter course title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              { required: true, message: "Enter duration (e.g. 2 months)" },
            ]}
          >
            <Select placeholder="Select duration">
              <Option value="2 months">2 months</Option>
              <Option value="4 months">4 months</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Lesson Duration"
            name="lesson_duration"
            rules={[
              {
                required: true,
                message: "Enter lesson duration (e.g. 90 minutes)",
              },
            ]}
          >
            <Select placeholder="Select lesson duration">
              <Option value="90 minutes">1.5</Option>
              <Option value="240 minutes">4</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Lessons in a week"
            name="lessons_in_a_week"
            rules={[
              { required: true, message: "Enter number of lessons per week" },
            ]}
          >
            <Select placeholder="Select lessons per week">
              <Option value={3}>3 ta dars</Option>
              <Option value={5}>5 ta dars</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CourseModal;
