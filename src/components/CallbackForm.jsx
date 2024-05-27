import { useForm } from 'react-hook-form';
import { sendModalCallback } from '../api/callbackModalApi'
import '../assets/styles/modal.css'
import { setNotification } from '../store/features/notification/notificationSlice';
import { useDispatch, useSelector } from "react-redux";


export default function CallbackForm({ setIsOpen }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm();

  const dispatch = useDispatch();

  const handlePhoneInput = (event) => {
    const input = event.target.value;
    const lastChar = input[input.length - 1] || ''
    const validator = /^[0-9+\-() ]*$/
    if (validator.test(lastChar) || input === '') {
      setValue('phone', input, { shouldValidate: true });
    } else {
      setValue('phone', getValues('phone'), { shouldValidate: true })
    }
  };

  const validatePhone = (input) => {
    const numDigits = input.match(/\d/g)?.length || 0;
    return numDigits >= 10 && numDigits <= 11;
  };

  const onSubmit = async (data) => {
    try {
      const message = `
        Новый заказ обратного звонка:
        Имя: ${data.name || 'Не указано'}
        Телефон: ${data.phone}
      `;

      console.log(message);
      await sendModalCallback(message)
      reset();
      dispatch(setNotification({
        message: 'Заявка отправлена, мы свяжемся с вами в течении двух рабочих дней и обязательно вас разместим.',
        type: 'success',
      }))
      setIsOpen(false)
    } catch (e) {
      setIsOpen(false)
      console.log(e);
      dispatch(setNotification({
        message: `Ошибка при отправке заявки, если она повторяется, свяжитесь с нами по телефону: 89242122377. 
        ${e.message}`,
        type: 'error',
      }))
    }
  };

  return (
    <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>
      <p className="modal__form-title">
        Заказать звонок
      </p>
      <div className='modal__input'>
        <label htmlFor="name">Ваше имя:</label>
        <input id="name"
          placeholder='Не обязательно'
          {...register('name', { required: false })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='modal__input'>
        <label htmlFor="phone">Телефон:</label>
        <input
          id="phone"
          onInput={handlePhoneInput}
          type="tel"
          {...register('phone', {
            required: 'Это поле обязательно',
            validate: validatePhone
          })}
        />
      </div>
      {errors.phone && <p className='modal__input-error'>{errors.phone.message || 'Телефон должен содержать ровно 11 цифр'}</p>}
      <button className='modal__submit' type="submit" >Отправить</button>
    </form>
  );
}