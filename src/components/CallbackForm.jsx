import { useForm } from 'react-hook-form';
import { sendModalCallback } from '../api/callbackModalApi'
import '../assets/styles/modal.css'

export default function CallbackForm({ setIsOpen }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm();

  const handlePhoneInput = (event) => {
    const input = event.target.value;
    const lastChar = input[input.length - 1] || ''
    const validator = /^[0-9+\-() ]*$/
    // console.log(event);
    console.log(event.target);
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
        Имя: ${data.name}
        Телефон: ${data.phone}
        Удобное время для звонка: ${data.time || 'Не указано'}
      `;

      console.log(message);
      await sendModalCallback(message)
      reset();
      setIsOpen(false)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>
      <div className='modal__input'>
        <label htmlFor="name">Ваше имя</label>
        <input id="name"
          placeholder='Не обязательно'
          {...register('name', { required: false })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='modal__input'>
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          onInput={handlePhoneInput}
          type="tel"
          {...register('phone', {
            required: 'Это поле обязательно',
            validate: validatePhone
          })}
        />
        {errors.phone && <p>{errors.phone.message || 'Телефон должен содержать ровно 11 цифр'}</p>}

      </div>
      <div className='modal__input'>
        <label htmlFor="time">Удобное время для звонка<br />(работаем с 9 до 20)</label>
        <input
          id="time"
          type="time"
          {...register('time')}
          min="09:00"
          max="20:00"
        />

      </div>
      <button className='modal__submit' type="submit" >Заказать звонок</button>
    </form>
  );
}