import axios from "axios";

const NetworkInstance1 = () => {
  const networkInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
  });

  return networkInstance;
};

export default NetworkInstance1;
