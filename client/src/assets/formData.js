import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";

export const signinForm = [
  {
    title: "email",
    placeholder: "Email",
    icon: <AiOutlineMail />,
  },
  {
    title: "password",
    type: "password",

    placeholder: "Password",
    icon: <MdPassword />,
  },
];

export const registerData = [
  {
    title: "name",
    type: "text",
    placeholder: "Your Name",
    icon: <AiOutlineUser />,
  },
  {
    title: "email",
    placeholder: "Your Email",
    icon: <AiOutlineMail />,
  },
  {
    title: "password",
    type: "password",

    placeholder: "Password",
    icon: <MdPassword />,
  },
];
