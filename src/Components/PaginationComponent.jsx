import { useDispatch, useSelector } from 'react-redux';
import { incrementOffset,  decrementOffset  } from '../Slice/parametersSlice'
import { Button } from 'react-bootstrap';
import { clearFilterIdsAll } from '../Slice/idsSlice'
const PaginationComponent = () => {

    const dispatch = useDispatch();
    const offset = useSelector(state => state.parameters.offset);
    const ids = useSelector(state => state.ids.ids);
    const isLodingItems = useSelector(state => state.items.loading);

    const clickNext = () => {
        dispatch(incrementOffset(50));
        dispatch(clearFilterIdsAll());
    }
    const clickPrev = () => {
        dispatch(decrementOffset (50));
        dispatch(clearFilterIdsAll());
    }

    return (<div>
        <Button  className="mt-4 mb-4 border-right mx-2" variant="secondary" onClick={clickPrev} disabled={offset === 0 ||  isLodingItems} >{'назад'}</Button>
    
        <Button  className="mt-4 mb-4" variant="secondary" onClick={clickNext} disabled={ids.lengh === 0 ||  isLodingItems} >{'вперед'}</Button>
    </div>)

}

export default PaginationComponent