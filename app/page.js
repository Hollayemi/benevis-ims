

import Login from "@/components/admin/Login/Login";
import AluminumRoofingLanding from "./static/page";

export default function Home() {
  return process.env.NEXT_APP_TYPE !== "exe" ? <AluminumRoofingLanding /> : <Login />;
  // return process.env.NODE_ENV === "production" ? <AluminumRoofingLanding /> : <Login />;
}
