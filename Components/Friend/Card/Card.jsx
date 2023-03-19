import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./Card.module.css";
import Images from "../../../assets";

const Card = ({ readMessage, el, i, readUser }) => {
  console.log(el);
  return (
    <Link
      href={{
        pathname: "/",
        query: { name: `${el.name}`, address: `${el.publicKey}` },
      }}
    >
      <div
        className={Style.Card}
        onClick={() => (readMessage(el.publicKey), readUser(el.publicKey))}
      >
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image
              src={Images.acountName}
              alt="username"
              width={50}
              height={50}
              className={Style.Card_box_left_img}
            />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4>{el.name}</h4>
              <small>{el.publicKey.slice(21)}..</small>
            </div>
            <div className={Style.Card_box_right_end}>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;