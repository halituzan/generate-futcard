import React, { useEffect, useState } from "react";
import TextInput from "../Patterns/TextInput";
import { countries } from "country-flag-icons";
import { useDispatch } from "react-redux";
import {
  selectImage,
  uploadFlag,
  uploadValues,
} from "@/lib/features/image/imageSlice";
import TextStore from "../Patterns/TextStore";
import Network from "@/helpers/Network";

type Props = {};

const Variables = (props: Props) => {
  const dispatch = useDispatch();
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const valueHandler = (e: any) => {
    const data = { key: e.target.name, data: e.target.value };
    dispatch(uploadValues(data));
  };

  const countryListHandler = async () => {
    try {
      const { data } = await Network.getData("api/general/get-countries");
      setCountryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    countryListHandler();
  }, []);

  return (
    <div className='px-2 py-4 border-t w-full flex flex-col'>
      <div className='flex items-center justify-between'>
        <TextStore
          onChange={valueHandler}
          label='Name'
          name='name'
          placeholder='Name'
          className='w-[33%]'
        />
        <TextStore
          onChange={valueHandler}
          label='Position'
          name='position'
          placeholder='Position'
          className='w-[33%]'
        />
        <TextStore
          onChange={valueHandler}
          label='Total Point (1 between 99)'
          name='totalPoint'
          placeholder='Total Point'
          className='w-[33%]'
          type='number'
        />
      </div>
      <div className='flex items-center'>
        <div className='w-12 h-9 flex justify-center items-center bg-slate/20 rounded-l-[7px]  '>
          <img
            src={
              selectedCountry
                ? `data:image/png;base64,${selectedCountry}`
                : `data:image/png;base64,${countryList[0]?.flag}`
            }
            className='h-full object-cover rounded-l-[7px]'
          />
        </div>
        <select
          onChange={(e) => {
            setSelectedCountry(
              countryList.find((env: any) => env.id == e.target.value)?.flag
            );
            dispatch(
              uploadFlag(
                `data:image/png;base64,${
                  countryList.find((env: any) => env.id == e.target.value)?.flag
                }`
              )
            );
          }}
          className='peer border border-slate border-l-0 rounded-l-none outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px] my-1 w-full'
        >
          {countryList.map((item: { name: string; id: number }, index) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Variables;
