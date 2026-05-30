import style from "./Segmentation.module.css";

import { Outlet } from "react-router";

export default function Segmentation() {
  return (
    <section id={style.segmentation}>
      <Outlet />
    </section>
  );
}
