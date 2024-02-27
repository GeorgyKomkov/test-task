import { useDispatch, useSelector } from 'react-redux';
import { incrementOffset,  decrementOffset  } from '../Slice/parametersSlice'
 import { Button } from 'react-bootstrap';

const PaginationComponent = () => {

    const dispatch = useDispatch();
    const offset = useSelector(state => state.parameters.offset);
    const ids = useSelector(state => state.ids.ids);

    const clickNext = () => dispatch(incrementOffset(50));
    const clickPrev = () => dispatch(decrementOffset (50));

    return (<div>
        <Button variant="secondary" onClick={clickPrev} disabled={offset === 0}>{'назад'}</Button>
        <Button variant="secondary" onClick={clickNext} disabled={ids.lengh === 0}>{'вперед'}</Button>
    </div>)

}

export default PaginationComponent