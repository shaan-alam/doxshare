import { ChevronLeft, Loader2 } from "lucide-react";
import QRCode from "react-qr-code";
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
import { useState } from "react";
import { api } from "@/utils/api";
import { useEditor } from "@/hooks/store";
import { ScrollArea } from "../ui/scroll-area";

enum Expiration {
  NEVER_EXPIRES = 0,
  CUSTOM = "Custom",
  ONE_MIN = 1,
  THREE_MINS = 3,
  FIVE_MINS = 5,
  TEN_MINS = 10,
  FIFTEEN_MINS = 15,
  THIRTY_MINS = 30,
  SIXTY_MINS = 60,
}

const ControlSidebar = () => {
  const editorContent = useEditor((state) => state.content);
  const [shareableLink, setShareableLink] = useState("");

  const { isLoading, mutate } = api.dox.createDox.useMutation({
    onSuccess: (result) => {
      setShareableLink(`localhost:3000/view/${result.dox.pathId}`);
    },
  });

  const [showCustomExpiration, setShowCustomExpiration] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      password: "",
      expiration: Expiration.NEVER_EXPIRES,
      exposure: "public",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        title: z.string({ required_error: "Title is required" }),
        password: z.string().optional(),
        exposure: z.string(),
        expiration: z.union([z.null(), z.number()]),
      }),
    ),
    onSubmit: (result) => {
      mutate({
        ...result,
        expiration:
          result.expiration !== 0
            ? new Date().getTime() + +result.expiration * 60 * 1000
            : 0,
        content: editorContent,
      });
    },
  });

  return (
    <aside className="mr-auto w-[30%] border-l border-primary-foreground">
      <ScrollArea className="h-screen p-6">
        <Link href="/app">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <div className="control-area mt-12 p-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-field mt-4">
              <Label>Dox Title</Label>
              {formik.touched.title && formik.errors.title && (
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
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className="form-field mt-4">
              <Label className="mb-2 block">Dox Expiration</Label>
              <Select
                defaultValue={`${formik.values.expiration}`}
                onValueChange={(value) => {
                  if (value === Expiration.CUSTOM) {
                    formik.setValues({
                      ...formik.values,
                      expiration: 0,
                    });
                    return setShowCustomExpiration(true);
                  } else {
                    setShowCustomExpiration(false);

                    formik.setValues({
                      ...formik.values,
                      expiration: value === Expiration.CUSTOM ? 0 : +value,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Never Expires"
                    defaultValue={Expiration.NEVER_EXPIRES.toString()}
                  />
                </SelectTrigger>
                <SelectContent className="border-primary-foreground">
                  <SelectItem value={Expiration.NEVER_EXPIRES.toString()}>
                    Never Expires
                  </SelectItem>
                  <SelectItem value={Expiration.ONE_MIN.toString()}>
                    1 min
                  </SelectItem>
                  <SelectItem value={Expiration.THREE_MINS.toString()}>
                    3 mins
                  </SelectItem>
                  <SelectItem value={Expiration.FIVE_MINS.toString()}>
                    5 mins
                  </SelectItem>
                  <SelectItem value={Expiration.TEN_MINS.toString()}>
                    15 mins
                  </SelectItem>
                  <SelectItem value={Expiration.FIFTEEN_MINS.toString()}>
                    30 mins
                  </SelectItem>
                  <SelectItem value={Expiration.SIXTY_MINS.toString()}>
                    1hr
                  </SelectItem>
                  <SelectItem value={Expiration.CUSTOM.toString()}>
                    Custom
                  </SelectItem>
                </SelectContent>
              </Select>
              {showCustomExpiration && (
                <>
                  {formik.touched.expiration && formik.errors.expiration && (
                    <small className="mt-2 block text-red-500">
                      {formik.errors.expiration}
                    </small>
                  )}
                  <Input
                    type="number"
                    placeholder="In mins"
                    className="mt-4"
                    id="expiration"
                    {...formik.getFieldProps("expiration")}
                  />
                </>
              )}
            </div>
            <div className="form-field mt-4">
              <Label className="mb-2 block">Dox Exposure</Label>
              <Select
                defaultValue="public"
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
            <Button disabled={isLoading} className="mt-4 w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Dox
            </Button>
            {shareableLink && (
              <div className="mt-4">
                <Input
                  value={shareableLink}
                  onClick={() => navigator.clipboard.writeText(shareableLink)}
                />
                <small className="mt-4 block text-gray-600">
                  Or Scan this QR Code
                </small>
                <QRCode size={256} value={shareableLink} className="mt-2" />
              </div>
            )}
          </form>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default ControlSidebar;
