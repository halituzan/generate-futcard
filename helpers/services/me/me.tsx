import Network from "@/helpers/Network";

const meHandler = async () => {
  try {
    const res = await Network.getData("api/me");
  } catch (error) {}
};

export default meHandler;
