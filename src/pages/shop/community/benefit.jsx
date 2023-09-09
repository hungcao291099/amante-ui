import { useEffect, useState } from "react";
import "swiper/css";
import { getBenefitInfo } from "@apis/community";
import CommuTab from "@components/CommuTab";

const Benefit = () => {
  const [getBenefit, setBenefit] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      setBenefit(await getBenefitInfo());
    };
    fetchData();
  }, []);
  return (
    <div>
      <CommuTab />
      <div
        className="content community benefit_page"
        dangerouslySetInnerHTML={{ __html: getBenefit.content }}
      ></div>
    </div>
  );
};

export default Benefit;
