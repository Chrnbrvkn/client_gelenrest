
export const bookingFields = [
  // основные данные брони
  { name: "status", label: 'Статус', type: "select", options: ["В ожидании", "Отменён", "Подтверждён"], requare: true, error: "Выберите статус" },
  { name: "checkInDate", label: 'Дата заезда', type: "date", requare: true, error: "Выберите дату заезда" },
  { name: "checkOutDate", label: 'Дата выезда', type: "date", requare: true, error: "Выберите дату выезда" },
  { name: "totalCost", label: 'Сумма брони', type: "number", requare: true, error: "Введите сумму брони" },
  { name: "guestName", label: 'Имя гостя', type: "text", requare: true, error: "Введите имя гостя" },
  { name: "guestContact", label: 'Контакт гостя', type: "text", requare: true, error: "Введите контактную информацию гостя" },
  { name: "guestsCount", label: 'Количество гостей', type: "number", requare: true, error: "Введите количество гостей" },
  // обязательные данные номера брони
  { name: "itemId", label: 'ID номера', type: "number", requare: true, },
  { name: "address", label: 'Адрес', type: "text", requare: true},
  { name: "itemType", label: 'Тип номера (Квартира / комната)', type: "text", requare: true},
  { name: "houseName", label: 'Название дома', type: "text", requare: true },
  { name: "itemName", label: 'Название номера', type: "text", requare: true, },
  { name: "dailyRate", label: 'Стоимость за день', type: "number", requare: true },
  { name: "totaldays", label: 'Общее количество дней', type: "number", requare: true },
  // дополнительные данные брони
  { name: "childAge", label: 'Возраст ребенка', type: "number", requare: false, },
  { name: "petBreed", label: 'Порода домашнего питомца', type: "text", requare: false, },
  { name: "petWeight", label: 'Вес питомца', type: "number", requare: false, },
  { name: "smoker", label: 'Курящий', type: "checkbox", requare: false, },
  { name: "disabledAccess", label: 'Требуется доступ для инвалидов', type: "checkbox", requare: false, },
  { name: "economyAccommodation", label: 'Экономное размещение', type: "checkbox", requare: false, },
  { name: "maxServiceAccommodation", label: 'Максимальный сервис', type: "checkbox", requare: false, },
  { name: "breakfastIncluded", label: 'Завтрак включен', type: "checkbox", requare: false, },
  { name: "toursIncluded", label: 'Экскурсии включены', type: "checkbox", requare: false, },
  { name: "workInternet", label: 'Интернет для работы', type: "checkbox", requare: false },
  { name: "transfer", label: 'Трансфер', type: "checkbox", requare: false, },
  { name: "discounts", label: 'Скидки', type: "text", requare: false, },
  { name: "bonuses", label: 'Бонусы', type: "text", requare: false, },
];

export const houseFields = [
  { name: "name", label: 'Название дома', type: "text", error: "Введите название дома", requare: true },
  { name: "address", label: 'Адрес', type: "text", error: "Введите адрес дома", requare: true },
  { name: "description_1", label: 'Описание 1', type: "textarea", error: "Введите Описание 1", requare: false },
  { name: "description_2", label: 'Описание 2', type: "textarea", error: "Введите Описание 2", requare: false },
  { name: "description_3", label: 'Описание 3', type: "textarea", error: "Введите Описание 3", requare: false },
  { name: "description_4", label: 'Описание 4', type: "textarea", error: "Введите Описание 4", requare: false },
  { name: "roomCount", label: 'Количество комнат', type: "number", error: "Введите количество комнат", requare: true },
  { name: "roomCategories", label: 'Категории комнат', type: "text", error: "Введите категории комнат", requare: true },
  { name: "meal", label: 'Питание', type: "text", error: "Введите информацию о питании", requare: true },
  { name: "bookingConditions", label: 'Условия бронирования', type: "text", error: "Введите условия бронирования", requare: true },
  { name: "checkoutTime", label: 'Время выезда', type: "text", error: "Введите время выезда", requare: true },
  { name: "timeToSea", label: 'Время до моря', type: "text", error: "Введите время до моря", requare: true },
  { name: "timeToMarket", label: 'Время до магазина', type: "text", error: "Введите время до магазина", requare: true },
  { name: "timeToCafe", label: 'Время до кафе', type: "text", error: "Введите время до кафе", requare: true },
  { name: "timeToBusStop", label: 'Время до остановки', type: "text", error: "Введите время до остановки", requare: true },
  { name: "timeToBusCityCenter", label: 'Время до центра города на автобусе', type: "text", error: "Введите время до центра города на автобусе", requare: true },
  { name: "allHouseBooking", label: 'Возможность забронировать дом полностью', type: "checkbox", requare: false },
  { name: "internet", label: 'Интернет', type: "checkbox", requare: false },
  { name: "tv", label: 'Телевизор', type: "checkbox", requare: false },
  { name: "pool", label: 'Бассейн', type: "checkbox", requare: false },
  { name: "babyCot", label: 'Детская кроватка', type: "checkbox", requare: false },
  { name: "yard", label: 'Двор', type: "checkbox", requare: false },
  { name: "dishwasher", label: 'Посудомоечная машина', type: "checkbox", requare: false },
  { name: "washingMachine", label: 'Стиральная машина', type: "checkbox", requare: false },
  { name: "diningArea", label: 'Обеденная зона', type: "checkbox", requare: false },
  { name: "freeParking", label: 'Бесплатная парковка', type: "checkbox", requare: false },
  { name: "roomCleaning", label: 'Уборка номеров', type: "checkbox", requare: false },
  { name: "beddingChange", label: 'Смена постели', type: "checkbox", requare: false },
  { name: "sharedKitchen", label: 'Общая кухня', type: "checkbox", requare: false },
  { name: "iron", label: 'Утюг', type: "checkbox", requare: false },
  { name: "bbqGrill", label: 'Мангал для барбекю', type: "checkbox", requare: false },
  { name: "refrigerator", label: 'Холодильник', type: "checkbox", requare: false },
  { name: "transferService", label: 'Трансфер', type: "checkbox", requare: false },
  { name: "laundryService", label: 'Прачечная', type: "checkbox", requare: false },
];


export const apartFields = [
  { name: "name", label: 'Название квартиры', type: "text", error: "Введите название квартиры", requare: true },
  { name: "address", label: 'Адрес', type: "text", error: "Введите адрес квартиры", requare: true },
  { name: "price", label: 'Цена', type: "number", error: "Введите Цену квартиры", requare: true },
  { name: "description_1", label: 'Описание 1', type: "textarea", error: "Введите Описание 1", requare: false },
  { name: "description_2", label: 'Описание 2', type: "textarea", error: "Введите Описание 2", requare: false },
  { name: "description_3", label: 'Описание 3', type: "textarea", error: "Введите Описание 3", requare: false },
  { name: "description_4", label: 'Описание 4', type: "textarea", error: "Введите Описание 4", requare: false },
  { name: "bedCount", label: 'Количество спальных мест', type: "number", error: "Введите Количество спальных мест", requare: true },
  { name: "roomCount", label: 'Количество комнат', type: "number", error: "Введите Количество комнат", requare: true },
  { name: "level", label: 'Этаж', type: "number", error: "Введите этаж", requare: true },
  { name: "roomCategories", label: 'Категории комнат', type: "text", error: "Введите Категории комнат", requare: true },
  { name: "meal", label: 'Кухня', type: "select", options: ["в номере", "отдельно"], error: "Кухня в номере или отдельно", requare: true },
  { name: "bathroom", label: 'Санузел', type: "select", options: ["в номере", "на этаже"], error: "Санузел в номере или на этаже", requare: true },
  { name: "bathType", label: 'Ванная комната (душ/ванна)', type: "select", options: ["ванна", "душ"], error: "Ванная комната (душ/ванна)", requare: true },
  { name: "bookingConditions", label: 'Условия бронирования', type: "text", error: "Введите Условия бронирования", requare: true },
  { name: "checkoutTime", label: 'Время заселения и выезда', type: "text", error: "Введите время заселения и выезда", requare: true },
  { name: "timeToSea", label: 'время до моря', type: "text", error: "Введите время до моря", requare: true },
  { name: "timeToMarket", label: 'время до магазина', type: "text", error: "Введите время до магазина", requare: true },
  { name: "timeToCafe", label: 'время до кафе', type: "text", error: "Введите время до кафе", requare: true },
  { name: "timeToBusStop", label: 'время до автобусной остановки', type: "text", error: "Введите время до автобусной остановки", requare: true },
  { name: "timeToBusCityCenter", label: 'время до центра города', type: "text", error: "Введите время до центра города", requare: true },
  { name: "internet", label: 'Интернет', type: "checkbox", requare: false },
  { name: "robotCleaner", label: 'робот-пылесос', type: "checkbox", requare: false },
  { name: "yandexColumn", label: 'яндекс колонка', type: "checkbox", requare: false },
  { name: "tv", label: 'Телевизор', type: "checkbox", requare: false },
  { name: "pool", label: 'Бассейн', type: "checkbox", requare: false },
  { name: "babyCot", label: 'Детская кроватка', type: "checkbox", requare: false },
  { name: "yard", label: 'Двор', type: "checkbox", requare: false },
  { name: "dishwasher", label: 'Посудомоечная машина', type: "checkbox", requare: false },
  { name: "washingMachine", label: 'Стиральная машина', type: "checkbox", requare: false },
  { name: "diningArea", label: 'Обеденная зона', type: "checkbox", requare: false },
  { name: "freeParking", label: 'Бесплатная парковка', type: "checkbox", requare: false },
  { name: "roomCleaning", label: 'Уборка номеров', type: "checkbox", requare: false },
  { name: "beddingChange", label: 'Смена постели', type: "checkbox", requare: false },
  { name: "sharedKitchen", label: 'Общая кухня', type: "checkbox", requare: false },
  { name: "iron", label: 'Утюг', type: "checkbox", requare: false },
  { name: "bbqGrill", label: 'Мангал для барбекю', type: "checkbox", requare: false },
  { name: "refrigerator", label: 'Холодильник', type: "checkbox", requare: false },
  { name: "transferService", label: 'Трансфер', type: "checkbox", requare: false },
  { name: "laundryService", label: 'Прачечная', type: "checkbox", requare: false }
]

export const roomFields = [
  { name: "name", label: 'Название комнаты', type: "text", error: "Введите название комнаты", requare: true },
  { name: "address", label: 'Адрес', type: "text", error: "Введите адрес дома", requare: true },
  { name: "price", label: 'Цена', type: "number", error: "Введите цену номера", requare: true },
  { name: "roomCount", label: 'Количество комнат', type: "number", error: "Введите количество комнат", requare: true },
  { name: "bedCount", label: 'Количество спальных мест', type: "number", error: "Введите спальных мест", requare: true },
  { name: "level", label: 'Этаж', type: "number", error: "Введите этаж", requare: true },
  { name: "bedroom", label: 'Описание спальни', type: "text", error: "Введите Описание Спальни", requare: true },
  { name: "bathroom", label: 'Санузел', type: "select", options: ["в номере", "на этаже"], error: "Санузел в номере или на этаже", requare: true },
  { name: "bathType", label: 'Санузел (душ/ванна)', type: "select", options: ["ванна", "душ"], error: "Ванная комната (душ/ванна)", requare: true },
  { name: "meal", label: 'Кухня', type: "select", options: ["в номере", "отдельно"], error: "Кухня в номере или отдельно", requare: true },
  // { name: "facilities", label: 'Удобства', type: "text", error: "Введите Удобства", requare: true },
  { name: "robotCleaner", label: 'робот-пылесос', type: "checkbox", requare: false },
  { name: "yandexColumn", label: 'яндекс колонка', type: "checkbox", requare: false },
]

