import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlog } from "@/types/blog";
import { dateConvert } from "@/utils/convertDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ data }: { data: IBlog }) => {
  return (
    <Link key={data?._id} href={`/blogs/${data?._id}`}>
      <Card>
        <div className="relative w-full h-[350px] ">
          <Image
            src={data?.thumbnail || "/placeholder.png"}
            fill={true}
            alt={`${data?.title} image`}
            loading="lazy"
            quality={10}
          />
        </div>
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>{data?.description}</CardDescription>
        </CardHeader>

        <CardFooter>
          <div className="flex gap-4 mb-3 items-center">
            <Avatar className="size-10">
              <AvatarImage
                src={data?.author.photo}
                alt={`${data?.author?.name} img`}
              />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-normal text-muted-foreground">
                {data?.author?.name}
              </p>
              <p className="font-normal text-muted-foreground">
                {dateConvert(data?.createdAt)}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
