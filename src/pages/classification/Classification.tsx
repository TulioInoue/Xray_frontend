import style from "./Classification.module.css";

import { Outlet } from "react-router";

export default function Classification() {
  return (
    <section id={style.classification}>
      <Outlet />
    </section>
  );
}
