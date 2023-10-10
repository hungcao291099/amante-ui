import { product, productCate } from "@apis/product";
import BannerCategory from "@components/Product/ProductList/BannerCategory";
import BestList from "@components/Product/ProductList/BestList";
import PageNavigate from "@components/Product/ProductList/PageNavigate";
import Item from "@components/Product/Item";
import { CdnContext } from "@contexts/cdnContext";
import api from "@utils/api/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Filter from "./Filter";
import jwt_decode from "jwt-decode";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";
import { transform } from "framer-motion";
import { AiOutlineDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsArrowClockwise } from "react-icons/bs";
import React from "react";
import LoadingBox from "@components/LoadingBox";
import { stringify } from "uuid";
import { Login } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatNumber } from "@utils/functions";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState();
  const [getData, setData] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [orderBy, setOrderBy] = useState("A");
  const [inStock, setInStock] = useState(false);
  const [codes, setCodes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(10);
  const [cateData, setCateData] = useState({});
  const [cateBanner, setCateBanner] = useState([]);
  const observer = useRef();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { baseUrl } = useContext(CdnContext);
  const category1Cd = Number(urlParams.get("sh_category1_cd")) || "";
  const category2Cd = Number(urlParams.get("sh_category2_cd")) || "";
  const category3Cd = Number(urlParams.get("sh_category3_cd")) || "";
  const { cate, cate2, cate3, bests } = cateData;

  const cookies = new Cookies();
  const token = cookies.get("member_access_token");
  const userData = token ? jwt_decode(token) : null;
  const cust_seq = userData?.cust_seq || null;
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [Hcode, setHcode] = useState();
  const [curPage, setcurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [pageCount, setpageCount] = useState([]);
  const [ParentCate, setParentCate] = useState([]);
  const [props, setProps] = useState([]);
  const [done, setDone] = useState(0);

  let cat_code = Number(urlParams.get("cat_code")) || "";
  const [cat_name, setCatName] = useState();
  useEffect(() => {
    setDone(0);
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/shop/product/category/newlist`,
          method: "GET",
        });

        // data.data.map(cate => {
        //   setParentCate(prev => [...prev, cate.CAT_CODE])
        // })
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setHasMore(true);
    setcurPage(1)
    setDone(0);
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/shop/app/product/hCode/dCode2`,
          method: "GET",
          params: {
            CAT_CODE: cat_code,
          },
        });

        setHcode(data.response);
        setDone((x) => x + 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat_code]);

  useEffect(() => {
    const fetchData = async () => {
      const { sortList, codeList } = await product();
      setSorts(sortList);
      setCodes(codeList);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await productCate(category1Cd, category2Cd, category3Cd, token);
  //     setCateData(data.cateData);
  //     setCateBanner(data.cateBanner);
  //   };

  //   fetchData();
  // }, [category1Cd, category2Cd, category3Cd]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await api.get(`/shop/product/list`, {
  //         params: {
  //           pageCnt: rowCount,
  //           orderBy,
  //           inStock,
  //           sh_category1_cd: category1Cd,
  //           sh_category2_cd: category2Cd,
  //           sh_category3_cd: category3Cd,
  //         },
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProducts(data);
  //       setRowCount(Number(data.pageCnt));
  //       setHasMore(data.data.length > 0);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [rowCount, orderBy, inStock, category1Cd, category2Cd, category3Cd]);

  const getSortValue = (e) => {
    setOrderBy(e.target.value);
  };

  const lastRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && done<2) {
          setcurPage((curPage) => curPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // const lastRef = useCallback(
  //   (node) => {
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setRowCount((prev) => prev + 10);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [hasMore]
  // );

  const [checkedOption, setCheckedOption] = useState([]);
  const handleCheckOption = (e) => {
    setProducts([]);
    const value = e.target.value;
    const optSelected = value.split("_");
    if (checkedOption.length == 0) {
      setProducts([]), setHasMore(true);
    }

    // if(e.target.checked) {
    //   const obj = checkedOption.filter(el => el.split("|")[0] === optSelected[0])[0]
    //   if(obj) {
    //     setCheckedOption(checkedOption.map(el => el.split("|")[0] === optSelected[0] ? `${el.split("|")[0]}|${el.split("|")[1]}.${optSelected[1]}` : el))
    //   } else {
    //     setCheckedOption(prev => {
    //       return [...prev, `${value.split("|")[0]}|${value.split("|")[1]}`]
    //     })
    //   }
    // } else {

    //   setCheckedOption(checkedOption.map(el => el.split("|")[0] === optSelected[0] ? `${el.replace(`.${optSelected[1]}`, "")}` :  el ))
    // }

    var checkedOpt = {
      CAT_CODE: optSelected[0],
      H_CODE: optSelected[1],
      D_CODE: [optSelected[2]],
    };
    if (e.target.checked) {
      const obj = checkedOption.filter(
        (el) =>
          `${el.CAT_CODE}-${el.H_CODE}` ===
          `${optSelected[0]}-${optSelected[1]}`
      )[0];
      if (obj) {
        setCheckedOption(
          checkedOption.map((el) =>
            `${el.CAT_CODE}-${el.H_CODE}` ===
            `${optSelected[0]}-${optSelected[1]}`
              ? { ...el, D_CODE: [...el.D_CODE, optSelected[2]] }
              : el
          )
        );
      } else {
        setCheckedOption((prev) => {
          return [...prev, checkedOpt];
        });
      }
    } else {
      const temp = checkedOption.filter(
        (el) =>
          `${el.CAT_CODE}-${el.H_CODE}` ===
          `${optSelected[0]}-${optSelected[1]}`
      )[0];
      if (temp.D_CODE.length > 1) {
        setCheckedOption(
          checkedOption.map((el) =>
            `${el.CAT_CODE}-${el.H_CODE}` ===
            `${optSelected[0]}-${optSelected[1]}`
              ? { ...el, D_CODE: el.D_CODE.filter((x) => x !== optSelected[2]) }
              : el
          )
        );
      } else {
        setCheckedOption((prev) =>
          prev.filter((x) => x.H_CODE !== temp.H_CODE)
        );
      }
    }
  };
  const ClearSelectedProp = () => {
    $(".option_checkbox").prop("checked", false);
    setProducts([]);
    setCheckedOption([]);
  };
  const cancelOption = (dcode) => {
    // setCheckedOption(checkedOption.filter(x => x !== value))
    setProducts([]);
    $(`#${dcode}`).prop("checked", false);
    const temp = checkedOption.filter(
      (el) => el.H_CODE === dcode.split("_")[1]
    )[0];
    if (temp.D_CODE.length > 1) {
      setCheckedOption(
        checkedOption.map((el) => {
          return el.H_CODE === dcode.split("_")[1]
            ? {
                ...el,
                D_CODE: el.D_CODE.filter((x) => x !== dcode.split("_")[2]),
              }
            : el;
        })
      );
    } else {
      setCheckedOption((prev) => prev.filter((x) => x.H_CODE !== temp.H_CODE));
    }
  };

  useEffect(() => {
    products ? setProductsLoaded(products.length) : null;
  }, [products]);

  useEffect(() => {
    var prop = checkedOption.map((x) => {
      var temp = `&prop[${x.CAT_CODE}_${x.H_CODE}]=${x.D_CODE.map(
        (y) => `${x.CAT_CODE}_${x.H_CODE}_${y}`
      )}`;
      return temp.replaceAll(",", "^");
    });
    var props = String(prop).replaceAll(",", "");
    props = encodeURI(props).replaceAll("%26", "&");
    history.pushState(
      null,
      null,
      `/shop/product/product_lists?cat_code=${cat_code}${props}`
    );
    setProps(props);
  }, [checkedOption]);

  useEffect(() => {
    console.log(done, hasMore, curPage);
    if (done ===1) {
      setLoading(true);
      if (hasMore) {
        const fetchData = async () => {
          try {
            const { data } = await api.get(
              `/shop/app/filter/product_lists?CAT_CODE=${cat_code}${
                props ? props : ""
              }&page=${curPage}`
            );
            if (
              (data.response.length == 0 && curPage > 1) ||
              data.response.length === products.length
            ) {
              setDone(2)
              setHasMore(false);
            }

            setProducts(data.response);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    }
  }, [curPage, props, cat_code, done]);

  useEffect(() => {
    setLoading1(true);
    const fetchData = async () => {
      try {
        const { data } = await api.get(
          `/shop/app/count/filter/product_lists?CAT_CODE=${cat_code}${
            props ? props : ""
          }`
        );
        setpageCount(data.response[0].CNT);
        setLoading1(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props, cat_code]);

  function findCategory(cat_code, categories) {
    var category = categories.filter((x) => x.CAT_CODE === cat_code)[0];
    if (category) {
      setCatName(category.CAT_NAME);
    } else {
      categories.map((cate2) => {
        let category2 = cate2.cate_list_2.filter(
          (x) => x.CAT_CODE === cat_code
        )[0];
        if (category2) {
          setCatName(category2.CAT_NAME);
        } else {
          cate2.cate_list_2.map((cate3) => {
            let category = cate3.cate_list_3.filter(
              (x) => x.CAT_CODE === cat_code
            )[0];
            if (category) {
              setCatName(category.CAT_NAME);
            }
          });
        }
      });
    }
  }

  useEffect(() => {
    setCheckedOption([]), $(".option_checkbox").prop("checked", false);
    if (cat_code && categories) findCategory(cat_code, categories);
    else {
      setCatName("");
    }
  }, [cat_code, categories]);

  useEffect(() => {
    $(".prop").css("border-color", "rgb(124, 124, 124)");
    checkedOption.map((opt) => {
      $(`.h-${opt.CAT_CODE}_${opt.H_CODE}`).css("border-color", "#c8877a");
    });
  }, [checkedOption]);

  function showMoreOpt() {
    $(".option-container").css("max-height", "fit-content");
    $(".more-subs").hide();
  }
  function hideOpt() {
    $(".option-container").css("max-height", "175px");
    $(".more-subs").show();
  }
  $(document).ready(function () {
    $(".arrow")
      .unbind("click")
      .click(function () {
        $(this).parent().parent().find(".depth-2").slideToggle();
        $(this).toggleClass("rotate");
      });

    $(".arrow2")
      .unbind("click")
      .click(function (e) {
        e.preventDefault();
        $(this).parent().parent().find(".depth-3").slideToggle();
        $(this).toggleClass("rotate");
      });
    $(".space").unbind().hover(function () {
      $(this).parent().css("border-color","#c8877a")
    }, function () {
      $(this).parent().css("border-color","#5f5f5f3f")
    })
   
    $(".prop")
      .unbind()
      .click(function () {
        $(".sub-prop").hide();
        $(this).find(".sub-prop").toggle();
        $(this).toggleClass("prop-active");
        $(".prop-outside").css("visibility", "visible");
      });
    $(".prop-outside")
      .unbind()
      .click(function () {
        $(".prop-outside").css("visibility", "hidden");
        $(".sub-prop").hide("fast");
        $(".prop").removeClass("prop-active");
        hideOpt();
      });

    $(".opt-text")
      .unbind()
      .hover(function () {
        $(this).parent().find(".more-text").toggle();
      });
  });

  // useEffect(() => {
  //   if (loading) {
  //     $(".loading-overlay").fadeIn("fast");
  //   } else {
  //     $(".loading-overlay").fadeOut("fast");
  //   }
  // }, [loading]);

  return (
    <>
      <Helmet>
        <title>
          {`아망떼 ㅣ
          ${
            cat_name

            // ? categories.category3_nm.replace(/<[^>]+>/g, '')
            // : categories?.category2_nm
            // ? categories.category2_nm.replace(/<[^>]+>/g, '')
            // : categories?.category_nm ? cate?.category_nm.replace(/<[^>]+>/g, '') : ''
          }`}
        </title>
      </Helmet>
      {/* <BannerCategory baseUrl={baseUrl} cateBanner={cateBanner} /> */}
      <div
        className={`content product product_lists_page ${
          category1Cd === 3 && category2Cd === ""
            ? "kids_page"
            : category1Cd === 13 && category2Cd === ""
            ? "disney_page"
            : ""
        }`}
      >
        {/* <div className="loading-overlay">
          <div className="loading-container">
            <img src="/images/login_logo.png" alt="" />
            <LoadingBox />
          </div>
        </div> */}
        <div className="prop-outside"></div>
        {/* <PageNavigate
          cateData={cate}
          category2Cd={category2Cd}
          category3Cd={category3Cd}
          parse={parse}
        /> */}

        <div className="mb_prd_lnb">
          {/* {ThisCate?(ThisCate[0].CAT_NAME):null} */}
        </div>

        <div className="wrap" id="wrap">
          <div className="left-wrap">
            <div className="sidebar">
              <ul className="depth-1">
                <div className="cate-panel">
                  {categories?.map((cate, index) => {
                    return (
                      <li key={index}>
                        <div className="space">
                          {cate.cate_list_2.length > 0 ? (
                            <div className="arrow">
                              <AiOutlineDown />
                            </div>
                          ) : (
                            <div className="arrow"></div>
                          )}
                          <Link
                            className="cate2"
                            to={`/shop/product/product_lists?cat_code=${cate.CAT_CODE}`}
                          >
                            <h3>{cate.CAT_NAME && parse(cate.CAT_NAME)}</h3>
                          </Link>
                        </div>
                        {cate.cate_list_2.length > 0 ? (
                          <div className="depth-2">
                            <ul>
                              <div className="cate-list-2">
                                {cate.cate_list_2?.map((cate2, index) => (
                                  <li key={index}>
                                    <div className="space">
                                      {cate2.cate_list_3.length > 0 ? (
                                        <div className="arrow2">
                                          <AiOutlineDown />
                                        </div>
                                      ) : (
                                        <div className="arrow2"></div>
                                      )}
                                      <Link
                                        className="cate2"
                                        to={`/shop/product/product_lists?cat_code=${cate2.CAT_CODE}`}
                                      >
                                        <h4>
                                          {cate2.CAT_NAME &&
                                            parse(cate2.CAT_NAME)}
                                        </h4>
                                      </Link>
                                    </div>

                                    {cate2.cate_list_3.length > 0 ? (
                                      <ul className="depth-3">
                                        {cate2.cate_list_3?.map(
                                          (cate3, index) => (
                                            <li key={index}>
                                              <Link
                                                to={`/shop/product/product_lists?cat_code=${cate3.CAT_CODE}`}
                                              >
                                                <h5>
                                                  {cate3.CAT_NAME &&
                                                    parse(cate3.CAT_NAME)}
                                                </h5>
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : null}
                                  </li>
                                ))}
                              </div>
                            </ul>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>

          <div className="right-wrap">
            <div className="pc_prd_lnb">{cat_name}</div>
            {/* <BestList bests={bests} Item={Item} /> */}

            {Hcode && (
              <ul className={"prd-props"}>
                {Hcode?.map((h_code, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li>
                        <div className={`prop h-${h_code.H_CODE}`}>
                          {h_code?.H_NAME}
                          <AiOutlineDown />
                          {h_code.DETAILED?.length > 0 ? (
                            <div className={`sub-prop opt-${h_code.H_CODE}`}>
                              <div className="option-container">
                                {h_code.DETAILED?.map((d_code, index) => {
                                  return (
                                    <div key={index} className="option">
                                      <input
                                        className="option_checkbox"
                                        type="checkbox"
                                        id={`${d_code.D_CODE}`}
                                        value={`${d_code.D_CODE}`}
                                        onClick={handleCheckOption}
                                      />
                                      <label
                                        className="opt-text"
                                        htmlFor={`${d_code.D_CODE}`}
                                      >
                                        {d_code.D_NAME}
                                      </label>

                                      {d_code.D_NAME.length > 10 ? (
                                        <div className="more-text">
                                          {d_code.D_NAME}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                              {h_code.DETAILED.length > 8 ? (
                                <div
                                  className="more-subs"
                                  onClick={() => {
                                    showMoreOpt();
                                  }}
                                >
                                  <p>+ 더보기</p>
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            )}
            {loading1 ? (
              <div className="page-count">
                <Skeleton width={120} height={25} />
              </div>
            ) : (
              <div className="page-count">{`총 ${
                pageCount ? formatNumber(pageCount) : 0
              } 개`}</div>
            )}
            <div>
              {checkedOption.length > 0 ? (
                <div className="props-container">
                  <ul className="total-props">
                    {checkedOption.flatMap((value, i) => {
                      var hcode = Hcode.filter(
                        (x) => x.H_CODE === `${value.CAT_CODE}_${value.H_CODE}`
                      )[0];
                      return value.D_CODE.map((vl, index) => {
                        var dcode = hcode.DETAILED.filter(
                          (x) =>
                            x.D_CODE ===
                            `${value.CAT_CODE}_${value.H_CODE}_${vl}`
                        )[0];
                        var dname = dcode.D_NAME;
                        return (
                          <div
                            key={`${i}-${index}`}
                            className="selected-prop"
                            onClick={() => {
                              cancelOption(dcode.D_CODE);
                            }}
                          >
                            <li>{dname}</li>
                            <MdOutlineCancel />
                          </div>
                        );
                      });
                    })}
                  </ul>
                  <div className="reset-props">
                    <div
                      className="reset-btn"
                      onClick={() => {
                        ClearSelectedProp();
                      }}
                    >
                      <BsArrowClockwise />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* <Filter
            products={products}
            setInStock={setInStock}
            sorts={sorts}
            getSortValue={getSortValue}
          /> */}

            <div className="prd_list">
              {loading  || loading1? (
                <ul id="product_ul">
                  {products.map((x) => (
                    <li>
                      <Skeleton variant="rounded" height={250} />
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" width={150} />
                      <Skeleton variant="rounded" width={120} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul id="product_ul">
                  {products?.length > 0 ? (
                    products.map((product, index) =>
                      index + 1 === products.length ? (
                        <Item key={index} item={product} lastRef={lastRef} />
                      ) : (
                        <Item key={index} item={product} />
                      )
                    )
                  ) : (
                    <li className="nodata">등록된 상품이 없습니다.</li>
                  )}
                </ul>
              )}

              {/* <ul id="product_ul">
              {products.data?.length > 0 ? (
                products.data.map((product, index) =>
                  index + 1 === products.data.length ? (
                    <Item
                      key={index}
                      item={product}
                      product={true}
                      codes={codes}
                      lastRef={lastRef}
                      cust_seq={cust_seq}
                      navigate={navigate}
                    />
                  ) : (
                    <Item
                      key={index}
                      item={product}
                      product={true}
                      codes={codes}
                      cust_seq={cust_seq}
                      navigate={navigate}
                    />
                  )
                )
              ) : (
                <li className="nodata">등록된 상품이 없습니다.</li>
              )}
            </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
