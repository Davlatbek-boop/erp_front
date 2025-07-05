import { Form, Input, Button } from "antd";
import * as yup from "yup";
import { authService } from "@service";
import { Notification } from "../../helpers/notification";
import type { SignIn } from "../../types";

// Yup validatsiya sxemasi
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email noto‘g‘ri")
    .required("Email majburiy"),
  password: yup
    .string()
    .min(6, "Parol kamida 6 belgidan iborat bo‘lishi kerak")
    .required("Parol majburiy"),
});

const SignIn = () => {
  const [form] = Form.useForm();

  const submit = async (values: SignIn) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      // valid bo‘lsa:
      console.log("Tizimga kirish:", values);
      authService.signIn(values);
    } catch (err) {
      Notification("error", "validatsiyadan o'tmadi")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

        <Form
          form={form}
          name="sign-in-form"
          layout="vertical"
          onFinish={submit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
          >
            <Input
              className="!rounded-md !py-2"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password
              className="!rounded-md !py-2"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
