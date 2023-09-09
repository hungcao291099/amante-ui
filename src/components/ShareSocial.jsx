import React from 'react';
import CopyClipboard from './icon/CopyClipboard';
import Kakao from './icon/Kakao';
import { shareSns } from '@utils/functions';
import Facebook from './icon/Facebook';

const ShareSocial = ({room, url, show, setShowSocialModal}) => {

  return (
   <>
     <div className={`share-social__wrap ${show? '' : 'hidden'}`} onClick={() => setShowSocialModal(false)}>
     </div>
       <ul className={`share-social ${show ? '' : 'hidden'} d-flex gap-3`}>
         <li>
           <Kakao shareSns={shareSns} desc={room.concept_room_nm} img={room.thumbnail} url={url}/>
         </li>
         <li>
           <Facebook shareSns={shareSns} url={url}/>
         </li>
         <li>
           <CopyClipboard shareSns={shareSns} url={url}/>
         </li>
       </ul>
   </>
  );
};

export default ShareSocial;
