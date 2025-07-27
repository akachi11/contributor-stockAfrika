import { useEffect, useState } from "react";
import Inventory from "./Inventory";
import ModalKYC from "./ModalKYC";
import Progress from "./Progress";
import Testimonial from "./Testimonial";

const Dashboard: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false)

  const openKYC = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when unmounting
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <main className="lg:px-7 px-5 font-inter grid gap-[37px]">
      {open &&
        <ModalKYC onClose={() => setOpen(false)} />
      }
      <Progress openKYC={openKYC} />
      <Inventory />
      <Testimonial />
    </main>
  );
};

export default Dashboard;
