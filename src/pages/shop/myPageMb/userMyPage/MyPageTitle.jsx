import styles from "./MyPageTitle.module.css"

import { AiOutlineSearch } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import userImage from './avatarUser.png';
import userIntersect from './intersect.png';








const MyPageMbTitle = () => {
return (
    <div className={styles.container_title}>
        <div className={styles.logo_container}> 
            <div className={styles.logo_container_center}>
                <div className={styles.logo}>
                    <span className={styles.letterD}>D</span>
                    <span className={styles.lettera}>a</span>
                    <span className={styles.letterH}>H</span>
                </div>
                <div className={styles.search_shopping}>
                    <div className={styles.search}>
                        <AiOutlineSearch size={24}/>
                    </div>
                    <div className={styles.shopping}>
                        <BsCart3 size={24}/>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.user_container}> 
            <div className={styles.user_location}> 
                <div className={styles.user_avatar_edit}>
                    <div className={styles.user_avatar}>
                        <img src={userImage} alt="user_avatar" className={styles.classimage1}/> 
                        <div className={styles.user_edit}>
                        <img src={userIntersect} alt="user_intersect" className={styles.classimage}/> 
                            <h1>edit</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.info_container}> 

        </div>


    </div>
)
}

export default MyPageMbTitle;