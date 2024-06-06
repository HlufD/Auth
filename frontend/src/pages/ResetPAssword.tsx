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
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const forgetPasswordSchema = z.object({
  confirmPassword: z.string().min(2, {
    message: "confirmPassword must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 2 characters." }),
});

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    const { password, confirmPassword } = values;

    try {
      if (password === confirmPassword) {
        const res = await axios.post(
          `http://localhost:3000/auth/reset-password/${token}`,
          { password, confirmPassword }
        );
        console.log(res.data);
        navigate("/");
        toast.success("Password reset successful!");
      } else {
        throw new Error("passwords don't match!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error("Unknown error occurred:", error);
        toast.error("Invalid or Expired Token!");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px] bg-white py-12 px-8 rounded-md shadow-md"
      >
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  type="password"
                  className="p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  className="p-5"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-[100%] uppercase text-white bg-blue-500 "
          variant="outline"
        >
          Reset
        </Button>
      </form>
    </Form>
  );
}

export default ResetPassword;
