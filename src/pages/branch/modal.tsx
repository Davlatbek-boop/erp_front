import { Modal, Form, Input, Button } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useEffect } from "react";
import type { Branch } from "@types";

interface Props {
  open: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: (values: Branch) => void;
  initialValues?: Branch | null;
  handleAdd: () => void;
  updateBranch: (values: Branch) => void
}

const BranchModal = ({
  open,
  title,
  onCancel,
  onSubmit,
  initialValues,
  handleAdd,
  updateBranch,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, open]);

  const handleOk = () => {
    form.validateFields().then((values: Branch) => {
     if(initialValues){
      updateBranch(values)
     }else{
      onSubmit(values)
     }
      form.resetFields();
    });
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd}>
        Add Branch
      </Button>
      <Modal
        open={open}
        title={title}
        onOk={handleOk}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter branch name" }]}
          >
            <Input placeholder="Branch name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Branch address" />
          </Form.Item>

          <Form.Item
            label="Call Number"
            name="call_number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <MaskedInput
              mask="+998 00 000 00 00"
              placeholder="+998 90 123 45 67"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BranchModal;
