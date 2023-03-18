import React from "react"
import Image from "next/image";

import Style from "./Loader.module.css";
import Images from "../../assets";


const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={Images.loader} alt="loader" width={100} height={100} />
      </div>
    </div>
  )
}

export default Loader