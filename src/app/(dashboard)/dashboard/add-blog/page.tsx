import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AddBlogForm from "@/components/modules/Blog/AddBlogForm";

const AddBlog = () => {
  return (
    <div className="w-full md:w-[780px] mx-auto mt-24">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-semibold capitalize text-2xl">
              Add Blog Content
            </CardTitle>
          </CardHeader>
          <AddBlogForm />
        </Card>
      </div>
    </div>
  );
};

export default AddBlog;
