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
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
});

function ForgetPassword() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email } = values;
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/forget-password",
        { email }
      );
      const message = res.data;
      toast.success(message);
    } catch (error) {
      toast.error("something went wrong!");
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
                <Input placeholder="Email" {...field} className="p-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-32 text-white bg-blue-500 uppercase"
          variant="outline"
        >
          submit
        </Button>
      </form>
    </Form>
  );
}

export default ForgetPassword;
