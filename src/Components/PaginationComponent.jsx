import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import React from 'react';
import { incrementOffset, decrementOffset } from '../Slice/parametersSlice';
import { clearFilterIdsAll } from '../Slice/idsSlice';

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.parameters.offset);
  const ids = useSelector((state) => state.ids.ids);
  const isLodingItems = useSelector((state) => state.items.loading);

  const clickNext = () => {
    dispatch(incrementOffset(50));
    dispatch(clearFilterIdsAll());
  };
  const clickPrev = () => {
    dispatch(decrementOffset(50));
    dispatch(clearFilterIdsAll());
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <Button className="mt-4 mb-4 btn btn-secondary" variant="secondary" onClick={clickPrev} disabled={offset === 0 || isLodingItems}>назад</Button>
      <Button className="mt-4 mb-4 border-right mx-2 btn btn-secondary" variant="secondary" onClick={clickNext} disabled={ids.length === 0 || isLodingItems}>вперед</Button>
    </div>
  );
}

export default PaginationComponent;
