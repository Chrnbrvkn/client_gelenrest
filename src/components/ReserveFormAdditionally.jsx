import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReserveFormAdditionally = () => {
  const { register } = useFormContext(); 

  return (
    <div className="reserve-form-additionally">
      <div className="form-group">
        <label htmlFor="petBreed">Порода питомца:</label>
        <input id="petBreed" {...register("petBreed")} placeholder="Введите породу питомца, если есть" />
      </div>

      <div className="form-group">
        <label htmlFor="petWeight">Вес питомца (кг):</label>
        <input id="petWeight" type="number" {...register("petWeight")} placeholder="Введите вес питомца, если есть" />
      </div>

      <div className="form-group">
        <label htmlFor="childAge">Возраст ребенка:</label>
        <input id="childAge" type="number" {...register("childAge")} placeholder="Введите возраст ребенка, если есть" />
      </div>

      <div className="form-group">
        <label htmlFor="smoker">Курящий:</label>
        <input id="smoker" type="checkbox" {...register("smoker")} />
      </div>

      <div className="form-group">
        <label htmlFor="disabledAccess">Доступ для инвалидов:</label>
        <input id="disabledAccess" type="checkbox" {...register("disabledAccess")} />
      </div>

      <div className="form-group">
        <label htmlFor="economyAccommodation">Эконом размещение:</label>
        <input id="economyAccommodation" type="checkbox" {...register("economyAccommodation")} />
      </div>

      <div className="form-group">
        <label htmlFor="maxServiceAccommodation">Максимальный сервис:</label>
        <input id="maxServiceAccommodation" type="checkbox" {...register("maxServiceAccommodation")} />
      </div>

      <div className="form-group">
        <label htmlFor="discounts">Скидки:</label>
        <input id="discounts" {...register("discounts")} placeholder="Введите доступные скидки" />
      </div>

      <div className="form-group">
        <label htmlFor="bonuses">Бонусы:</label>
        <input id="bonuses" {...register("bonuses")} placeholder="Введите доступные бонусы" />
      </div>

      <div className="form-group">
        <label htmlFor="transfer">Трансфер:</label>
        <input id="transfer" type="checkbox" {...register("transfer")} />
      </div>

      <div className="form-group">
        <label htmlFor="breakfastIncluded">Завтрак включен:</label>
        <input id="breakfastIncluded" type="checkbox" {...register("breakfastIncluded")} />
      </div>

      <div className="form-group">
        <label htmlFor="toursIncluded">Экскурсии включены:</label>
        <input id="toursIncluded" type="checkbox" {...register("toursIncluded")} />
      </div>

      <div className="form-group">
        <label htmlFor="workInternet">Рабочий интернет:</label>
        <input id="workInternet" type="checkbox" {...register("workInternet")} />
      </div>
    </div>
  );
};

export default ReserveFormAdditionally;
