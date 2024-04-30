import React from "react";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={styles.loader} />
      <h3 className="font-semibold text-2xl text-gray-400">
        Loading some great stuff
      </h3>
    </div>
  );
};

export default Loader;
