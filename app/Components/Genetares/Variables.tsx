import { positions } from "@/app/default";
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
interface Country {
  _id: string;
  name: string;
  flag: string; // Assuming the flag is a string representing the URL to the flag image
}

const Variables = ({ selectedImage }: Props) => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const result = useSelector((state: { image: any }) => state.image);
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectTeam, setSelectTeam] = useState(null);
  const [selectTeamBase64, setSelectTeamBase64] = useState("");
  const [name, setName] = useState("");
  const [totalPoint, setTotalPoint] = useState("");
  const [position, setPosition] = useState("CAM");
  const [pac, setPac] = useState("");
  const [sho, setSho] = useState("");
  const [pas, setPas] = useState("");
  const [dri, setDri] = useState("");
  const [def, setDef] = useState("");
  const [phy, setPhy] = useState("");

  const countryListHandler = async () => {
    try {
      const { data } = await Network.getData("api/general/get-countries");
      console.log("data", data);

      setCountryList(data);
      setSelectedCountry(data[0]?.flag);
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
    if (typeof res === "string") {
      setSelectTeamBase64(res);
    } else {
      // Handle the case where res is not a string appropriately
      console.error("Failed to convert file to base64:", res);
    }
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
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    countryListHandler();
  }, []);

  return (
    <div className='flex flex-col w-full flex-1 h-auto'>
      <div className='px-2 py-4 border-t w-full flex flex-col'>
        <div className='flex flex-col lg:flex-row items-center justify-between'>
          <TextInput
            setter={setName}
            label='Name'
            set={name}
            placeholder='Name'
            w='w-full lg:w-[32%]'
          />
          <div className='flex flex-col  w-full lg:w-[32%]'>
            <label htmlFor={`position`} className='text-sm font-normal'>
              Position
            </label>
            <select
              id='position'
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              className='peer border border-slate outline-none text-slate-dark font-600 text-[12px] w-full focus:border-slate-dark px-3 py-2 rounded-[7px] '
            >
              {positions.map((item, index) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <TextInput
            setter={setTotalPoint}
            label='Total Point'
            set={totalPoint}
            placeholder='(1 - 99)'
            w='w-full lg:w-[32%]'
            type='number'
            min='1'
            max='99'
          />
        </div>

        <div className='flex w-full justify-between'>
          <div className='w-full flex justify-between flex-col lg:flex-row flex-wrap'>
            <TextInput
              setter={setPac}
              set={pac}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "DIV" : "PAC"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />
            <TextInput
              setter={setSho}
              set={sho}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "HAN" : "SHO"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />
            <TextInput
              setter={setPas}
              set={pas}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "KIC" : "PAS"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />

            <TextInput
              setter={setDri}
              set={dri}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "REF" : "DRI"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />
            <TextInput
              setter={setDef}
              set={def}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "SPE" : "DEF"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />
            <TextInput
              setter={setPhy}
              set={phy}
              placeholder='(1 - 99)'
              insideLabel={position === "GK" ? "POS" : "PHY"}
              type='number'
              min='1'
              max='99'
              w='w-full lg:w-[48%]'
            />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <div className='w-full pr-2'>
            <div className='flex items-center my-2 '>
              <div className='w-12 h-9 flex justify-center items-center bg-slate/20 rounded-l-[7px]  '>
                <img
                  src={selectedCountry?.flag || countryList[0]?.flag}
                  className='h-full object-cover rounded-l-[7px]'
                />
              </div>
              <select
                onChange={(e) => {
                  const selectedCountryObj = countryList.find(
                    (env: any) => env._id == e.target.value
                  );
                  const flag = selectedCountryObj?.flag ?? countryList[0]?.flag;
                  setSelectedCountry(selectedCountryObj ?? undefined);
                }}
                className='peer border border-slate border-l-0 rounded-l-none outline-none text-slate-dark font-600 text-[12px] focus:border-slate-dark px-3 py-2 rounded-[7px]  w-full'
              >
                {countryList.map((item: { name: string; _id: string }) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button
              text='Team'
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
