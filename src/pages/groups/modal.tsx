import { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Course, Group } from "@types";
import { groupService } from "@service";

type Props = {
  courses: Course[];
  setGroup: React.Dispatch<React.SetStateAction<Group[]>>;
};


const { Option } = Select;

const AddGroupModal = ({ courses }: Props) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          ...values,
          start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
          end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
        };
        groupService.createGroup(payload);
        form.resetFields();
        setOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 mt-5"
          onClick={showModal}
        >
          Add Group
        </Button>
  
      </div>
      <Modal
        title="Create New Group"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
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
