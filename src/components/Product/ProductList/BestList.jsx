import { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick';


const BestList = ({ bests, Item }) => {
  const [isMobile, setIsMobile] = useState(false);
  var settings = {
    dots: false,
    arrows: true,
    slidesToShow: bests?.length > 4 ? 4 : bests?.length,
    slidesToScroll: 1,
    variableWidth: true,
    swipe: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResize(); // Check initial window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    bests?.length > 0 && (
      <div className="must_buy_this">
        <p className="tit">신상품</p>

        <div className="prd_list best_list">
          <ul className='slider-container'>
            {isMobile? (
              bests.map((best, index) => <Item item={best} key={index} />)
            ) : (
              <Slider {...settings}>
                {bests.map((best, index) => (
                  <Item item={best} key={index} />
                ))}
              </Slider>
            )}
          </ul>
        </div>
      </div>
    )
  );
};

export default BestList;
