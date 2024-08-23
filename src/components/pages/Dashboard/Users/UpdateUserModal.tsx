import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserType, UserType } from "@/lib/type/user";
import { updateUser } from "@/lib/network/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateUserModalProps {
  children?: ReactNode;
  user: UserType;
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  role: z.string().min(1),
});

export default function UpdateUserModal({
  children,
  user,
}: UpdateUserModalProps) {
  const [image, setImage] = useState<File>();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setImage(picture);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const { mutate: onUpdateUser } = useMutation({
    mutationFn: (values: CreateUserType) => updateUser(user.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
      toast.success("User updated!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateUser({
      ...values,
      image: image!,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            Update User Data
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="unit">Unit</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <FormLabel>Profile Image</FormLabel>
              <Input onChange={handleImageUpload} type="file" />
            </div>

            <Button className="w-full lg:w-1/3">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
