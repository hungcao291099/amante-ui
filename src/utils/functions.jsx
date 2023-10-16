import api from "../utils/api/api";

export const formatNumber = (number) => {
  var formatter = new Intl.NumberFormat("en-US", {
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(number);
};

export const splitStr = (str, index) => {
  const result = str?.slice(0, index);
  return result;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const truncate = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const getMsToEndOfDay = (date) => {
  // Create a new date object for the input date
  const currentDate = new Date(date);
  const endOfDay = new Date(date);
  // Set the time to the end of the day
  endOfDay.setHours(23, 59, 59, 999);
  // Calculate the difference in milliseconds between the input date and the end of the day
  const diffMs = Math.floor(
    (endOfDay.getTime() - currentDate.getTime()) / 1000
  );
  return diffMs;
};

export function checkDevice() {
  var userAgent = navigator.userAgent;
  var isMobile = /Mobi/.test(userAgent);
  var isTablet = /(tablet|ipad|playbook|silk)|(android(?!. *mobi))/i.test(
    userAgent
  );

  if (isMobile) {
    return "mobile";
  } else if (isTablet) {
    return "tablet";
  } else {
    return "desktop";
  }
}

export const likeProduct = async function (product_cd, cust_seq) {
  let mode;
  const el = $(".wish_" + product_cd);

  if (el.hasClass("on")) {
    el.removeClass("on");
    mode = "DEL";
  } else {
    el.addClass("on");
    mode = "ADD";
  }

  try {
    await api({
      url: "/product/wish_proc",
      method: "POST",
      data: { product_cd, cust_seq, mode },
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeInfo = async (sort, gubun, ref_seq, user_id, cust_seq) => {
  let mode;
  const el = $(`.like-room.${ref_seq}`);
  if (el.hasClass("on")) {
    el.removeClass("on");
    mode = "DEL";
  } else {
    el.addClass("on");
    mode = "ADD";
  }

  try {
    await api({
      url: "/shop/common/like_info_proc",
      method: "POST",
      data: {
        mode,
        sort,
        gubun,
        ref_seq,
        user_id,
        cust_seq,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const productOptions = (arr) => {
  const returnArr = arr.map((item) => {
    return { label: item.product_nm, value: item.product_cd };
  });
  return returnArr;
};

export const shareSns = (
  type,
  img,
  desc,
  likeCnt = 0,
  commentCnt = 0,
  url = window.location.href
) => {
  if (type === "U") {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("URL이 복사되었습니다.");
  } else if (type === "F") {
    window.open(
      "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url)
    );
  } else if (type === "K") {
    Kakao.init(import.meta.env.VITE_KAKAO_KEY);
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "아망떼",
        description: desc,
        imageUrl: img,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: likeCnt,
        commentCount: commentCnt,
      },
      buttons: [
        {
          title: "상품 보기",
          link: {
            mobileWebUrl: url,
          },
        },
      ],
    });
  } else if (type === "S") {
    Kakao.init(import.meta.env.VITE_KAKAO_KEY);
    Kakao.Story.share({
      url: url,
      text: document.title,
    });
  } else if (type === "L") {
    const title = "아망떼";
    const summary = desc;
    const br = "\n";
    const shareURL =
      "http://line.me/msg/text/?" +
      encodeURIComponent(title + br + summary + br + url);
    document.location = shareURL;
  } else if (type === "B") {
    const product = desc;
    window.location.href =
      "http://band.us/plugin/share?body=" + product + "&route=" + url;
  }
};

export const clickOutsideClose = (el, setValue, value) => {
  document.addEventListener("click", (e) => {
    const selectLabel = document.querySelector(`.${el}`);
    if (selectLabel) {
      if (!selectLabel.contains(e.target)) {
        setValue(value);
      }
    }
  });
};

export const removeHtmlTags = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};

export const getDayAndMonth = (string) => {
  const date = new Date(string);

  const day = date.getDate();
  const month = date.getMonth() + 1;

  return day + "." + month;
};
