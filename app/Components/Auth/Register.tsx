import React, { useState } from "react";
import TextInput from "../Patterns/TextInput";
import Button from "../Patterns/Buttons";
import { Icon } from "@iconify/react";
import Network from "@/helpers/Network";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const registerHandler = async () => {
    const body = {
      userName,
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const res = await Network.postData("/api/auth/register", body);
      toast.success(res.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between w-screen h-screen font-din'>
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
      <div className='bg-white text-slate-dark border h-screen flex-1 flex flex-col justify-center items-center'>
        <div className='px-10 w-full md:w-[500px]'>
          <h2 className='mb-5 text-4xl font-bold flex items-center  font-din'>
            Generate Futcard
            <Icon icon='maki:soccer' className='text-blue-700' />
          </h2>
          <p className='text-lg mb-10 font-500 text-blue-700  font-din'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            odit modi deleniti repellendus!
          </p>
        </div>
        <div className=' w-full md:w-[500px] flex justify-between items-center px-10'>
          <div style={{ width: "48%" }}>
            <TextInput
              set={firstName}
              setter={setFirstName}
              placeholder='Name'
              label='Name'
            />
          </div>
          <div style={{ width: "48%" }}>
            <TextInput
              set={lastName}
              setter={setLastName}
              placeholder='Surname'
              label='Surname'
            />
          </div>
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
          className='px-10'
          w='w-full md:w-[500px]'
          set={email}
          setter={setEmail}
          placeholder='Email'
          type='email'
          label='Email'
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
        <TextInput
          set={passwordConfirm}
          setter={setPasswordConfirm}
          placeholder='Password Confirm'
          type='password'
          label='Password Confirm'
          className='px-10'
          w='w-full md:w-[500px]'
        />
        <div className='px-10 w-full md:w-[500px]'>
          <Button
            onClick={registerHandler}
            text='Sign Up'
            textColor='text-white'
            color='bg-blue-600'
            className='self-end mt-5 w-full  font-din'
            disabled={
              !userName ||
              !firstName ||
              !lastName ||
              !password ||
              !passwordConfirm
            }
          />
        </div>
        <div className='px-10 mt-4  w-full  md:w-[500px] flex justify-between items-center'>
          <p className='font-500  font-din'>Do you have an account?</p>
          <a
            href='/login'
            className='text-blue-500 font-700 font-din hover:text-blue-800'
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
