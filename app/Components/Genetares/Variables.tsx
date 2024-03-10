import React, { useEffect, useState } from "react";
import TextInput from "../Patterns/TextInput";
import { countries } from "country-flag-icons";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import {
  selectImage,
  uploadFlag,
  uploadImage,
  uploadValues,
} from "@/lib/features/image/imageSlice";
import TextStore from "../Patterns/TextStore";
import Network from "@/helpers/Network";
import Button from "../Patterns/Buttons";

type Props = {
  selectedImage: any;
};

const Variables = ({ selectedImage }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [name, setName] = useState("");
  const [totalPoint, setTotalPoint] = useState("");
  const [position, setPosition] = useState("");
  const [pac, setPac] = useState("");
  const [sho, setSho] = useState("");
  const [pas, setPas] = useState("");
  const [dri, setDri] = useState("");
  const [def, setDef] = useState("");
  const [phy, setPhy] = useState("");

  const countryListHandler = async () => {
    try {
      const { data } = await Network.getData("api/general/get-countries");
      setCountryList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeBg = async () => {
    setLoading(true);
    try {
      dispatch(uploadFlag(selectedCountry));
      dispatch(uploadValues({ key: "name", data: name }));
      dispatch(uploadValues({ key: "totalPoint", data: totalPoint }));
      dispatch(uploadValues({ key: "position", data: position }));
      dispatch(uploadValues({ key: "pac", data: pac }));
      dispatch(uploadValues({ key: "sho", data: sho }));
      dispatch(uploadValues({ key: "pas", data: pas }));
      dispatch(uploadValues({ key: "dri", data: dri }));
      dispatch(uploadValues({ key: "def", data: def }));
      dispatch(uploadValues({ key: "phy", data: phy }));
      const { data } = await Network.postData("/api/remove", {
        url: selectedImage.image,
      });
      dispatch(uploadImage(data));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    countryListHandler();
  }, []);

  return (
    <>
      <div className='px-2 py-4 border-t w-full flex flex-col'>
        <div className='flex items-center justify-between'>
          <TextInput
            setter={setName}
            label='Name'
            set={name}
            placeholder='Name'
            className='w-[32%]'
          />
          <TextInput
            setter={setPosition}
            label='Position'
            set={position}
            placeholder='Position'
            className='w-[32%]'
          />
          <TextInput
            setter={setTotalPoint}
            label='Total Point (1 - 99)'
            set={totalPoint}
            placeholder='Total Point'
            className='w-[32%]'
            type='number'
            min='1'
            max='99'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-12 h-9 flex justify-center items-center bg-slate/20 rounded-l-[7px]  '>
            <img
              src={
                selectedCountry
                  ? selectedCountry
                  : `data:image/png;base64,${countryList[0]?.flag}`
              }
              className='h-full object-cover rounded-l-[7px]'
            />
          </div>
          <select
            onChange={(e) => {
              setSelectedCountry(
                `data:image/png;base64,${
                  countryList.find((env: any) => env.id == e.target.value)?.flag
                }`
              );
            }}
            className='peer border border-slate border-l-0 rounded-l-none outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px] my-1 w-full'
          >
            {countryList.map((item: { name: string; id: number }, index) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className='flex w-full justify-between mt-2'>
          <div className='w-[48%] flex flex-col'>
            <TextInput
              setter={setPac}
              set={pac}
              placeholder='PAC (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
            <TextInput
              setter={setSho}
              set={sho}
              placeholder='SHO (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
            <TextInput
              setter={setPas}
              set={pas}
              placeholder='PAS (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
          </div>
          <div className='w-[48%] flex flex-col items-end'>
            <TextInput
              setter={setDri}
              set={dri}
              placeholder='DRI (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
            <TextInput
              setter={setDef}
              set={def}
              placeholder='DEF (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
            <TextInput
              setter={setPhy}
              set={phy}
              placeholder='PHY (1 - 99)'
              type='number'
              min='1'
              max='99'
            />
          </div>
        </div>
      </div>
      {selectedImage.id && (
        <Button
          text='Add Canvas'
          iconLeft='icon-park-twotone:clear'
          color='bg-blue-500'
          className='w-full rounded-t-none'
          onClick={removeBg}
        />
      )}
      {loading && (
        <div className='z-50 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-blue-500/20'>
          <Icon
            icon='eos-icons:bubble-loading'
            fontSize={100}
            className='text-blue-500'
          />
        </div>
      )}
    </>
  );
};

export default Variables;
