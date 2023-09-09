import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Card from '@components/ConceptRoom/ConceptRoomList/Card';
import { useConceptRoomContext } from '@contexts/ConceptRoomContext';
import api from '@utils/api/api';
import { Link } from 'react-router-dom';
import DropdownArea from '@components/ConceptRoom/ConceptRoomList/DropdownArea';
import { conceptRoomImageURL } from '@utils/constants';
import DropdownList from '../../../components/ConceptRoom/DropdownSelect/DropdownList';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownFilter from '../../../components/ConceptRoom/DropdownFilter/DropdownFilter';

const ConceptRoomList = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const { isMobile } = useConceptRoomContext();
  const [hasMore, setHasMore] = useState(true);
  const [rowCount, setRowCount] = useState(6);
  const [styles, setStyles] = useState([]);
  const [rooms, setRooms] = useState([]);
  const observer = useRef();
  const [filter, setFilter] = useState({value: 'newest', name: '인기순'})

  const lastRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setRowCount((prev) => prev + 6);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const { data } = await api({
          url: '/room/concept/styles/list',
          method: 'GET',
        });
        setStyles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStyle();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api({
          url: `/room/concept/list`,
          method: 'GET',
          params: {
            styles: encodeURIComponent(JSON.stringify(dataFilter)),
            row_count: rowCount,
            start_num: 1,
            filter: filter.value
          },
        });
        setRooms(data.list);
        setRoomCount(data.total);
        setRowCount(Number(data.limit));
        setHasMore(data.list?.length > 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataFilter, rowCount, filter]);

  return (
    <>
      <Helmet>
        <title>아망떼 ㅣ컨셉룸</title>
      </Helmet>

      {!isMobile && (
        <div className="banner-brand">
          <Link to="/shop/product/shopping_home">
            <img src={`/images/concept-room/banner-brand.jpg`} alt="" />
            <Container className="brand-content">
              <h6>스타일링 by 아망떼</h6>
              <h3>직접 꾸민 인테리어로 얻는 스타일링 TIP</h3>
            </Container>
          </Link>
        </div>
      )}

      <DropdownArea
        styles={styles}
        conceptRoomImageURL={conceptRoomImageURL}
        setDataFilter={setDataFilter}
        dataFilter={dataFilter}
      />

      <DropdownFilter setFilter={setFilter} filter={filter}/>

      <Container className="card-list">
        <Row className="my-4">
          <Col lg={1} className="total-room">
            총 {roomCount}개
          </Col>
        </Row>
        <Row className="card-wrap" lg={3} md={2}>
          {/* ------------ CARD render -------------- */}
          {rooms?.length === 0 ? (
            <div className="no-card">
              <h4>항목이 없습니다</h4>
            </div>
          ) : (
            rooms.map((room, index) => {
              if (index + 1 === rooms?.length) {
                return <Card data={{ room, lastRef }} key={index} />;
              } else {
                return <Card data={{ room }} key={index} />;
              }
            })
          )}
        </Row>
      </Container>
    </>
  );
};

export default ConceptRoomList;
