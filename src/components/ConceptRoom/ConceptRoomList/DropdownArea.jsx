import DropdownList from '@components/ConceptRoom/DropdownSelect/DropdownList';
import { useState } from 'react';
import { memo } from 'react';
import { Container } from 'react-bootstrap';

const DropdownArea = ({ styles, conceptRoomImageURL, setDataFilter, dataFilter }) => {
  const [activeList, setActiveList] = useState(null);

  return (
    <Container className="mt-4">
      <div className="select-btn d-flex flex-wrap">
        {styles?.map((style, index) => (
          <DropdownList
            key={style.h_code}
            conceptRoomImageURL={conceptRoomImageURL}
            index={index}
            style={style}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            activeList={activeList}
            setActiveList={setActiveList}
          />
        ))}
      </div>
    </Container>
  );
};

export default memo(DropdownArea);

