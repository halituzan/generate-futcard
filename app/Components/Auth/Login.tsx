import React, { useState } from "react";
import TextInput from "../Patterns/TextInput";
import Button from "../Patterns/Buttons";
import { Icon } from "@iconify/react";
import Network from "@/helpers/Network";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const body = {
      userName,
      password,
    };
    try {
      await Network.postData("/api/auth/login", body);
      router.push("/");
      toast.success("Giriş Başarılı");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between w-screen h-screen'>
      <div className='hidden md:flex md:w-1/2 h-screen overflow-hidden flex-1 z-0 relative px-10'>
        <div className='grid grid-cols-3 gap-1 w-full overflow-hidden opacity-50 h-screen -z-0'>
          <div className='grid-cols-1 animate-slide-down login-image-carousel'>
            <img src='/images/3.png' alt='' />
            <img src='/images/4.png' alt='' />
            <img src='/images/5.png' alt='' />
            {/* <img src='/images/6.png' alt='' />
            <img src='/images/7.png' alt='' />
            <img src='/images/8.png' alt='' /> */}
          </div>
          <div className='grid-cols-1 animate-slide-up login-image-carousel'>
            <img src='/images/8.png' alt='' />
            <img src='/images/7.png' alt='' />
            <img src='/images/6.png' alt='' />
            {/* <img src='/images/5.png' alt='' />
            <img src='/images/4.png' alt='' />
            <img src='/images/3.png' alt='' /> */}
          </div>
          <div className='grid-cols-1 animate-slide-down login-image-carousel'>
            {" "}
            <img src='/images/8.png' alt='' />
            <img src='/images/7.png' alt='' />
            <img src='/images/6.png' alt='' />
            {/* <img src='/images/5.png' alt='' />
            <img src='/images/4.png' alt='' />
            <img src='/images/3.png' alt='' /> */}
          </div>
        </div>
        {/* <img
          src='/images/login-bg.png'
          width={"100%"}
          height={"100%"}
          className=' object-cover h-full w-full'
          alt=''
        /> */}
      </div>
      <div className='bg-white text-slate-dark border h-screen flex-1 z-10 flex flex-col justify-center items-center w-full md:w-1/2'>
        <div className='px-10  w-full md:w-[500px]'>
          <h2 className='mb-5 text-4xl font-bold flex items-center '>
            Generate Futcard
            <Icon icon='maki:soccer' className='text-blue-700' />
          </h2>
          <p className='text-lg mb-10 font-500 text-blue-700'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            odit modi deleniti repellendus!
          </p>
        </div>

        <TextInput
          set={userName}
          setter={setUserName}
          placeholder='Username'
          type='text'
          label='Username'
          className='px-10'
          w='w-full md:w-[500px]'
        />

        <TextInput
          set={password}
          setter={setPassword}
          placeholder='Password'
          type='password'
          label='Password'
          className='px-10'
          w='w-full md:w-[500px]'
        />

        <div className='px-10 w-full md:w-[500px]'>
          <Button
            onClick={loginHandler}
            text='Login'
            textColor='text-white'
            color='bg-blue-600'
            className='self-end mt-5 w-full'
            disabled={!userName || !password}
          />
        </div>
        <div className='px-10 mt-4 w-full md:w-[500px] flex justify-between items-center'>
          <p className='font-500'>Don't have an account?</p>
          <a
            href='/register'
            className='text-blue-500 font-700 hover:text-blue-800'
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
