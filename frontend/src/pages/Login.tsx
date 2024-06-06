import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(5, { message: "password must be at least 2 characters." }),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { email, password } = values;
      const res = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password,
      });
      const data = res.data;
      dispatch(setUser(data));
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px] bg-white py-12 px-8 rounded-md shadow-md"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} className="p-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  className="p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button
            className="w-32 text-white bg-blue-500 uppercase "
            variant="outline"
          >
            Login
          </Button>
          <Link to={"/forget-password"} className="text-sm ml-5 text-blue-500">
            Forgot password ?
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default Login;
