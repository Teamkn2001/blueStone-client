import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router-dom";
import bluestoneBG from "@/assets/bg-office.png";
import bluestoneIcon from "@/assets/logo2.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
    <div className="absolute inset-0 z-0">
      <div
        className="w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${bluestoneBG})` }}
      />
    </div>

    <Card className="w-96 shadow-lg z-10 bg-white rounded-md">
      <CardHeader className="flex justify-center ">
        <img src={bluestoneIcon} alt="Bluestone Logo" />
      </CardHeader>

      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  </div>
  );
}