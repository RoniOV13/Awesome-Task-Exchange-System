# Service:
-Task
-Auth
-Analytics
-Accounting

# Синхронные
BE:
- процесс авторизации


# Асинхронные

# BE:
 - смена роли пользователя
 - назначена цена списания и выплаты для задачи

# Producer
 - Задача выполнена
# Consumer
 - Accouting, Analytics??

# Producer
 - Задача переназначена
# Consumer
 - Accouting, Analytics??

# Producer
 - Списаны деньги
# Consumer
 - Analytics

# Producer
 - выплачены деньги
# Consumer
 - Analytics


# Producer
 - списан баланс
# Consumer
 - Analytics



# CUD:
 # Producer
  - CUD-события для auth:
 # Consumer
  - Accouting

 # Producer
  - CUD-события для task
 # Consumer
  - Accouting

 # Producer
  - CUD-события для accouting
 # Consumer
  - Analytics



