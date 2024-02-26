import { message } from "antd";

export const showAlert = {
  success: (string, duration = 3) => {
    message.success(string, duration);
  },
  error: (string, duration = 3) => {
    message.error(string, duration);
  },
};
