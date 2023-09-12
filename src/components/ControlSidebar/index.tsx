import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const ControlSidebar = () => {
  const formSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    password: z.string().optional(),
    expiration: z.number(),
    exposure: z.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      password: "",
      expiration: 60,
      exposure: "public",
    },
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (result) => {
      console.log(result);
    },
  });

  return (
    <aside className="h-screen w-[20%] border-l border-primary-foreground p-6">
      <Link href="/app">
        <Button variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>
      <div className="control-area mt-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-field mt-4">
            <Label>Dox Title</Label>
            {(formik.touched.title || formik.errors.title) && (
              <small className="mb-1 block text-red-500">
                {formik.errors.title}
              </small>
            )}
            <Input
              className="mt-2 bg-primary-foreground"
              placeholder="My Dox"
              id="title"
              {...formik.getFieldProps("title")}
            />
          </div>
          <div className="form-field mt-4">
            <Label>Password (Optional) </Label>
            <Input
              className="mt-2 bg-primary-foreground"
              placeholder="*******"
            />
          </div>
          <div className="form-field mt-4">
            <Label className="mb-2 block">Dox Expiration</Label>
            <Select
              onValueChange={(value) =>
                formik.setValues({
                  ...formik.values,
                  expiration: +value * 60 * 1000,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Never Expires" />
              </SelectTrigger>
              <SelectContent className="border-primary-foreground">
                <SelectItem value="0">Never Expires</SelectItem>
                <SelectItem value="1">1 min</SelectItem>
                <SelectItem value="2">3 mins</SelectItem>
                <SelectItem value="5">5 mins</SelectItem>
                <SelectItem value="15">15 mins</SelectItem>
                <SelectItem value="30">30 mins</SelectItem>
                <SelectItem value="60">1hr</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="form-field mt-4">
            <Label className="mb-2 block">Dox Exposure</Label>
            <Select
              onValueChange={(value) =>
                formik.setValues({ ...formik.values, exposure: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Public" />
              </SelectTrigger>
              <SelectContent className="border-primary-foreground">
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4 w-full">Create Dox</Button>
        </form>
      </div>
    </aside>
  );
};

export default ControlSidebar;
