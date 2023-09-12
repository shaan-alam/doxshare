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

const ControlSidebar = () => {
  return (
    <aside className="border-l border-primary-foreground h-screen w-[20%] p-6">
      <Link href="/app">
        <Button variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>
      <div className="control-area mt-12">
        <div className="form-field mt-4">
          <Label>Dox Title</Label>
          <Input className="mt-2 bg-primary-foreground" placeholder="My Dox" />
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Never Expires" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Never Expires">Never Expires</SelectItem>
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="3m">3m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="30m">30m</SelectItem>
              <SelectItem value="1hr">1hr</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="form-field mt-4">
          <Label className="mb-2 block">Dox Exposure</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Public" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">Public</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-4 w-full">Create Dox</Button>
      </div>
    </aside>
  );
};

export default ControlSidebar;
