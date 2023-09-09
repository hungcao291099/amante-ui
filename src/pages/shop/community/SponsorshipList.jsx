import { getCommunityList} from "@apis/community";
import CommuTab from '@components/CommuTab';
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import 'swiper/css';











const SponsorshipList = () => {
  const [sponsorshipList, setSponsorshipList] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCommunityList()
      setSponsorshipList(result);
    };

    fetchData();
  }, []);


  return (
<div>
  <CommuTab/>
  <div className="content community sponsorship_list_page">
    
        <div className="inner">
            <ul className="sponsorship_lists" id="sponsorship_ul">
            {sponsorshipList && sponsorshipList.map((sponsorship, idx) => (
             <li key={idx}>
              <a href={`/shop/community/sponsorship_view?event_seq=${sponsorship.event_seq}`}>
                 <picture className="img">
                     <source srcSet={`/uploads/sponsorship/${sponsorship.file_nm1}`} media="(max-width:767px)"></source>
                     <source srcSet={`/uploads/sponsorship/${sponsorship.file_nm1}`} media="(max-width:768px)"></source>
                     <img src={`/uploads/sponsorship/${sponsorship.file_nm1}`} alt="협찬"/>
                 </picture>
             </a>
             <div className="con">
             <a href={`/shop/community/sponsorship_view?event_seq=${sponsorship.event_seq}`}><p className="tit">{sponsorship.event_nm}</p></a>
             </div>
         </li>
          ))}
            
            </ul>
            <div className="btn_area">
                <button type="button" className="btn_txt btn_arrow" id="showMoreList" ><span>더 보기</span></button>
            </div>
        </div>
    </div>
</div>
    
  );
};

export default SponsorshipList;




