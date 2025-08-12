import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/reducer/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
