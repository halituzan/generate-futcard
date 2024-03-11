import Network from "@/helpers/Network";
import fileToBase64 from "@/helpers/fileToBase64";
import {
  uploadFlag,
  uploadImage,
  uploadTeam,
  uploadValues,
} from "@/lib/features/image/imageSlice";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
import TextInput from "../Patterns/TextInput";
type Props = {
  selectedImage: any;
};

const Variables = ({ selectedImage }: Props) => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const result = useSelector((state: { image: any }) => state.image);

  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectTeam, setSelectTeam] = useState(null);
  const [selectTeamBase64, setSelectTeamBase64] = useState("");

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

  const upload = () => {
    if (!uploadInput.current) return;
    uploadInput.current.click();
  };

  const inputChangeHandler = async (e: any) => {
    const res = await fileToBase64(e.target.files[0]);

    setSelectTeam(e.target.files[0]);
    setSelectTeamBase64(res);
  };

  const removeBg = async () => {
    setLoading(true);
    try {
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
      dispatch(uploadFlag(selectedCountry));
      dispatch(uploadTeam(selectTeamBase64));
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
    <div className='flex flex-col w-full flex-1 h-auto'>
      <div className='px-2 py-4 border-t w-full flex flex-col'>
        <div className='flex items-center justify-between'>
          <TextInput
            setter={setName}
            label='Name'
            set={name}
            placeholder='Name'
            className='w-[31%]'
          />
          <TextInput
            setter={setPosition}
            label='Position'
            set={position}
            placeholder='Position'
            className='w-[31%]'
          />
          <TextInput
            setter={setTotalPoint}
            label='Total Point (1 - 99)'
            set={totalPoint}
            placeholder='Total Point'
            className='w-[31%]'
            type='number'
            min='1'
            max='99'
          />
        </div>

        <div className='flex w-full justify-between'>
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
        <div className='flex items-center w-full'>
          <div className='w-full'>
            <div className='flex items-center my-2'>
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
                      countryList.find((env: any) => env.id == e.target.value)
                        ?.flag
                    }`
                  );
                }}
                className='peer border border-slate border-l-0 rounded-l-none outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px]  w-full'
              >
                {countryList.map(
                  (item: { name: string; id: number }, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  }
                )}
              </select>
            </div>
            <Button
              text='Add Team Logo'
              iconLeft='line-md:uploading-loop'
              color='bg-blue-500'
              className='w-full h-10'
              onClick={upload}
            />
            <input
              type='file'
              className='hidden'
              accept='image/png, image/jpeg'
              ref={uploadInput}
              onChange={(e) => {
                inputChangeHandler(e);
              }}
            />
          </div>
          <div className='w-full flex justify-center items-center mt-2'>
            {selectTeam && (
              <img
                src={URL.createObjectURL(selectTeam)}
                alt='team'
                className='w-[92px] h-[92px]'
              />
            )}
          </div>
        </div>
      </div>
      {selectedImage.id && (
        <Button
          text='Add Canvas'
          iconLeft='carbon:spray-paint'
          color='bg-blue-500'
          className='w-full rounded-t-none text-xl'
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
    </div>
  );
};

export default Variables;
