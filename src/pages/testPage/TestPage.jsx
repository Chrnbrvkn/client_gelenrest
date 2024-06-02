import React, { useEffect } from "react";
import { Slider } from "../../widgets/slider";
import { useSelector, useDispatch } from "react-redux";
import { fetchApartsAsync } from "../../store/features/lists/aparts/apartsFetch";
import LoadingSpinner from '../../components/LoadingSpinner';

export default function TestPage() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  useEffect(() => {
    dispatch(fetchApartsAsync())
  },[]);

  const apartsPictures = useSelector((state) => state.aparts.data);
  console.log(apartsPictures);


  return (
    isLoading 
    ?
    <LoadingSpinner />
    :
    apartsPictures[0]
    ?
    <Slider pictures={apartsPictures[0].images}/>
    :
    <div>Нет изображений для отображения</div>
  );
}
