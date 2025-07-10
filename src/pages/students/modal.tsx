import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import type { FormInstance } from "antd/es/form";
import { MaskedInput } from "antd-mask-input";
import type { CreateStudent } from "../../types";

const { Option } = Select;

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  createStudent: (value: CreateStudent) => void;
}

const StudentModal: React.FC<Props> = ({
  open,
  onCancel,
  onSubmit,
  createStudent,
}) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.validateFields().then((values: CreateStudent) => {
      createStudent(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Yangi Foydalanuvchi Qo‘shish"
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          gender: "male",
          lidId: 1,
          eventsId: 1,
          groupsId: 1,
        }}
      >
        <Form.Item
          label="Ismi"
          name="first_name"
          rules={[{ required: true, message: "Iltimos, ismni kiriting" }]}
        >
          <Input placeholder="Ali" />
        </Form.Item>

        <Form.Item
          label="Familiyasi"
          name="last_name"
          rules={[{ required: true, message: "Iltimos, familiyani kiriting" }]}
        >
          <Input placeholder="Valiyev" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email manzilni kiriting" },
            { type: "email", message: "To‘g‘ri email manzil kiriting" },
          ]}
        >
          <Input placeholder="ali.valiyev@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Call Number"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <MaskedInput
            mask="+998 00 000 00 00"
            placeholder="+998 90 123 45 67"
          />
        </Form.Item>

        <Form.Item
          label="Parol"
          name="password_hash"
          rules={[{ required: true, message: "Parolni kiriting" }]}
        >
          <Input.Password placeholder="AliValiyev123!" />
        </Form.Item>

        <Form.Item
          label="Jinsi"
          name="gender"
          rules={[{ required: true, message: "Jinsini tanlang" }]}
        >
          <Select>
            <Option value="male">Erkak</Option>
            <Option value="female">Ayol</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tug‘ilgan sana"
          name="date_of_birth"
          rules={[{ required: true, message: "Tug‘ilgan sanani tanlang" }]}
        >
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </Form.Item>

        <Form.Item name="lidId" hidden initialValue={1}>
          <Input />
        </Form.Item>

        <Form.Item
          name="eventsId"
          label="Hodisalar"
          rules={[{ required: true, message: "Kamida bitta hodisa tanlang" }]}
        >
          <Select mode="multiple" placeholder="Hodisalarni tanlang">
            <Select.Option value={1}>Event 1</Select.Option>
            <Select.Option value={2}>Event 2</Select.Option>
            {/* Dinamik ravishda eventlar map qilinadi */}
          </Select>
        </Form.Item>

        <Form.Item
          name="groupsId"
          label="Guruhlar"
          rules={[{ required: true, message: "Kamida bitta guruh tanlang" }]}
        >
          <Select mode="multiple" placeholder="Guruhlarni tanlang">
            <Select.Option value={1}>Group 1</Select.Option>
            <Select.Option value={2}>Group 2</Select.Option>
            {/* Dinamik ravishda grouplar map qilinadi */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentModal;
