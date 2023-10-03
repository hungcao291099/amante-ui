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
import React from "react";
import LoadingBox from "@components/LoadingBox";
import { stringify } from "uuid";

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
  const [Props, setProps] = useState();
  const [Hcode, setHcode] = useState();
  const [curPage, setcurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toltalSelect, settoltalSelect] = useState([]);

  let cat_code = Number(urlParams.get("cat_code")) || "";
  const [cat_name, setCatName] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/shop/product/category/newlist`,
          method: "GET",
        });
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat_code]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/shop/app/product/hCode/dCode`,
          method: "GET",
          params: {
            CAT_CODE: cat_code,
          },
        });
        setProps(data.response);
        setHcode(data.response.filter((x) => x.CAT_CODE === cat_code));
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
        if (entries[0].isIntersecting && hasMore) {
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
    const value = e.target.value;
    const optSelected = value.split("|");
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
      H_CODE: optSelected[0],
      D_CODE: [optSelected[1]],
    };
    console.log(e);
    if (e.target.checked) {
      const obj = checkedOption.filter((el) => el.H_CODE === optSelected[0])[0];
      if (obj) {
        setCheckedOption(
          checkedOption.map((el) =>
            el.H_CODE === optSelected[0]
              ? { ...el, D_CODE: [...el.D_CODE, optSelected[1]] }
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
        (el) => el.H_CODE === optSelected[0]
      )[0];
      if (temp.D_CODE.length > 1) {
        setCheckedOption(
          checkedOption.map((el) =>
            el.H_CODE === optSelected[0]
              ? { ...el, D_CODE: el.D_CODE.filter((x) => x !== optSelected[1]) }
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
  const cancelOption = ( hcode, dcode) => {
    
    // setCheckedOption(checkedOption.filter(x => x !== value))
    $(`#${hcode}-${dcode}`).prop("checked", false);
    const temp = checkedOption.filter((el) => el.H_CODE === String(hcode))[0];
    if (temp.D_CODE.length > 1) {
      setCheckedOption(
        checkedOption.map((el) =>{
          return(
          el.H_CODE === String(hcode)
            ? { ...el, D_CODE: el.D_CODE.filter((x) => x !== String(dcode)) }
            : el
          )
        }
        )
      )
    } else {
      setCheckedOption((prev) => prev.filter((x) => x.H_CODE !== temp.H_CODE));
    }
  };
  const findCategory = (categories, targetCode) => {
    for (const category of categories) {
      if (category.H_CODE === targetCode) {
        return category.H_NAME;
      }
      if (category.children && category.children.length > 0) {
        const nestedCategory = findCategory(category.children, targetCode);
        if (nestedCategory) {
          return nestedCategory;
        }
      }
    }
    return null;
  };
  
  useEffect(() => {
    if (categories && cat_code !== undefined) {
      const categoryName = findCategory(categories, cat_code);
      if (categoryName) {
        setCatName(categoryName);
      } else {
        // Handle the case when no category is found
        setCatName('Category Not Found');
      }
    }
  }, [cat_code, categories]);
  useEffect(() => {
    setProductsLoaded(products.length);
  }, [products]);
  useEffect(() => {
    setHasMore(true);
    setLoading(true);

    const fetchData = async () => {
      try {
        if (checkedOption.length > 0) {
          const { data } = await api({
            url: `/shop/app/product/code/props/and`,
            method: "POST",
            data: {
              props: checkedOption,
              page: curPage,
              CAT_CODE: cat_code,
            },
          });
          if (data.response.length == 0 && curPage > 2) {
            setHasMore(false);
          } else {
            setProducts(data.response);
          }
        } else {
          const data = await api({
            url: `/shop/app/product/category`,
            method: "GET",
            params: {
              CAT_CODE: cat_code,
              page: curPage,
            },
          });
          setProducts(data.data.response);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [curPage, checkedOption,cat_code]);

  $(document).ready(function () {
    $(".arrow")
      .unbind("click")
      .click(function () {
        $(this).parent().find(".depth-2").slideToggle();
        $(this).toggleClass("rotate");
      });

    $(".arrow2")
      .unbind("click")
      .click(function (e) {
        e.preventDefault();
        $(this).parent().find(".depth-3").slideToggle();
        $(this).toggleClass("rotate");
      });
    $(".depth-2 li")
      .unbind("click")
      .click(function (e) {
        e.stopPropagation();
      });
    $(".prop")
      .unbind()
      .click(function () {
        $(".sub-prop").hide();
        $(this).find(".sub-prop").toggle();
        $(".prop-outside").css("visibility", "visible");
      });
    $(".prop-outside")
      .unbind()
      .click(function () {
        $(".prop-outside").css("visibility", "hidden");
        $(".sub-prop").hide("fast");
      });

    $(".opt-text")
      .unbind()
      .hover(function () {
        $(this).parent().find(".more-text").toggle();
      });
  });

  useEffect(() => {
    if (loading) {
      $(".loading-overlay").fadeIn("fast");
    } else {
      $(".loading-overlay").fadeOut("fast");
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>
          {`아망떼 ㅣ
          ${
            categories?.CAT_NAME
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
        <div className="loading-overlay">
          <div className="loading-container">
            <img src="/images/login_logo.png" alt="" />
            <LoadingBox />
          </div>
        </div>
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
                          <Link
                            className="cate2"
                            to={`/shop/product/product_lists?cat_code=${cate.CAT_CODE}`}
                          >
                            <h3>{cate.CAT_NAME && parse(cate.CAT_NAME)}</h3>
                            {cate.cate_list_2.length > 0 ? (
                              <div className="depth-2">
                                <ul>
                                  <div className="cate-list-2">
                                    {cate.cate_list_2?.map((cate2, index) => (
                                      <li key={index}>
                                        <div className="space">
                                          <Link
                                            className="cate2"
                                            to={`/shop/product/product_lists?cat_code=${cate2.CAT_CODE}`}
                                          >
                                            <h4>
                                              {cate2.CAT_NAME &&
                                                parse(cate2.CAT_NAME)}
                                            </h4>

                                            {cate2.cate_list_3.length > 0 ? (
                                              <ul className="depth-3">
                                                {cate2.cate_list_3?.map(
                                                  (cate3, index) => (
                                                    <li key={index}>
                                                      <div className="space">
                                                        <Link
                                                          to={`/shop/product/product_lists?cat_code=${cate3.CAT_CODE}`}
                                                        >
                                                          <h5>
                                                            {cate3.CAT_NAME &&
                                                              parse(
                                                                cate3.CAT_NAME
                                                              )}
                                                          </h5>
                                                        </Link>
                                                      </div>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            ) : null}
                                          </Link>
                                        </div>
                                        {cate2.cate_list_3.length > 0 ? (
                                          <div className="arrow2"></div>
                                        ) : null}
                                      </li>
                                    ))}
                                  </div>
                                </ul>
                              </div>
                            ) : null}
                          </Link>
                        </div>
                        {cate.cate_list_2.length > 0 ? (
                          <div className="arrow"></div>
                        ) : null}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>

          <div className="right-wrap">
            <div className="pc_prd_lnb">
              {/* {ThisCate?(ThisCate[0].CAT_NAME):null} */}
            </div>

            {/* <BestList bests={bests} Item={Item} /> */}

            {Hcode && (
              <ul className={"prd-props"}>
                {Hcode?.map((h_code, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li>
                        <div className="prop">
                          {h_code?.H_NAME}
                          <AiOutlineDown />
                          {h_code.DETAILED?.length > 0 ? (
                            <div className="sub-prop">
                              <div className="option-container">
                                {h_code.DETAILED?.map((d_code, index) => {
                                  return (
                                    <div key={index} className="option">
                                      {/* <div className='checkbox' Hcode={h_code.H_CODE} Dcode={d_code.D_CODE} Catcode={cat_code} onClick={()=>{selectOption()}} ></div> */}
                                      <input
                                        className="option_checkbox"
                                        type="checkbox"
                                        id={`${h_code.H_CODE}-${d_code.D_CODE}`}
                                        value={`${h_code.H_CODE}|${d_code.D_CODE}|${cat_code}`}
                                        onClick={handleCheckOption}
                                      />
                                      <label
                                        className="opt-text"
                                        htmlFor={`${h_code.H_CODE}-${d_code.D_CODE}`}
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
                            </div>
                          ) : null}
                        </div>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            )}

            <div>
              {checkedOption.length > 0 ? (
                <ul className="total-props">
                {checkedOption.flatMap((value, i) => {
                  var hcode = Hcode.filter((x) => x.H_CODE === Number(value.H_CODE))[0];
                  return value.D_CODE.map((vl, index) => {
                    var dcode = hcode.DETAILED.filter((x) => x.D_CODE === Number(vl))[0];
                    var dname = dcode.D_NAME;
              
                    return (
                      <div
                        key={`${i}-${index}`}
                        className="selected-prop"
                        onClick={() => {
                          cancelOption(hcode.H_CODE, dcode.D_CODE);
                        }}
                      >
                        <li>{dname}</li>
                        <MdOutlineCancel />
                      </div>
                    );
                  });
                })}
              </ul>
              ) : null}
            </div>

            {/* <Filter
            products={products}
            setInStock={setInStock}
            sorts={sorts}
            getSortValue={getSortValue}
          /> */}

            <div className="prd_list">
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
