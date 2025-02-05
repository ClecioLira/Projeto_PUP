import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function MasonryImageList() {
  return (
    <div className="flex flex-col p-4 mt-8 items-center justify-center">

      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6">
        Celebre a vida com quem você ama
      </h2>

      <Box className="w-xs">
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                className="shadow-md shadow-gray-500"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

const itemData = [
  {
    img: "https://images.pexels.com/photos/2234418/pexels-photo-2234418.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "1",
  },
  {
    img: "https://images.pexels.com/photos/28939053/pexels-photo-28939053.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "2",
  },
  {
    img: "https://images.pexels.com/photos/6667976/pexels-photo-6667976.jpeg?auto=compress&cs=tinysrgb&w=60013651479-597eb2da0ad6",
    title: "3",
  },
  {
    img: "https://images.pexels.com/photos/6012807/pexels-photo-6012807.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "4",
  },
  {
    img: "https://images.pexels.com/photos/3077837/pexels-photo-3077837.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "5",
  },
  {
    img: "https://images.pexels.com/photos/1469880/pexels-photo-1469880.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "6",
  },
  {
    img: "https://images.pexels.com/photos/10732551/pexels-photo-10732551.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "7",
  },
  {
    img: "https://images.pexels.com/photos/28939052/pexels-photo-28939052/free-photo-of-crianca-sentada-perto-de-um-lago-alpino-em-meio-a-uma-paisagem-de-outono.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "8",
  },
  {
    img: "https://images.pexels.com/photos/3708444/pexels-photo-3708444.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "9",
  },
  {
    img: "https://images.pexels.com/photos/5962201/pexels-photo-5962201.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "10",
  },
  {
    img: "https://images.pexels.com/photos/10431312/pexels-photo-10431312.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "11",
  },
  {
    img: "https://images.pexels.com/photos/14043063/pexels-photo-14043063.jpeg?auto=compress&cs=tinysrgb&w=300",
    title: "12",
  },
];
