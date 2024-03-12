import { uploadValues } from "@/lib/features/image/imageSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  cardList: any;
  setOpenCards: any;
};

const CardDopdown = ({ cardList, setOpenCards }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className='absolute top-8 left-0 p-2 rounded-lg bg-white min-w-52 flex flex-wrap'>
      {cardList.map(
        (i: {
          id: number;
          color: string;
          columnColor: string;
          name: string;
        }) => {
          return (
            <div
              key={i.id}
              className=''
              onClick={() => {
                setOpenCards(false);
                dispatch(
                  uploadValues({
                    key: "defaultImgSrc",
                    data: i.id.toString(),
                  })
                );
                dispatch(
                  uploadValues({
                    key: "color",
                    data: i.color,
                  })
                );
                dispatch(
                  uploadValues({
                    key: "columnColor",
                    data: i.columnColor,
                  })
                );
              }}
            >
              <Image
                quality={0.5}
                src={`/images/1.png`}
                width="64"
                height="128"
                className='px-1 cursor-pointer hover:scale-[1.05]'
                alt={i.name}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default CardDopdown;
