# Server Documentation

## How to run server
From the root, run node server/index.js

## Endpoints

### Dish List

#### Single Dish Query
Route: /dish_list?id={id}
Ex: http://localhost:5003/dish_list?id=3
Ex Response: {"dish_id":3,"dish_name":"bigger_plate","number_entrees":3,"number_sides":1,"price":"9.65"}

#### Get Full Dish List
Route: /dish_list/summary
Ex: http://localhost:5003/dish_list/summary
Ex Response: \[{"dish_id":3,"dish_name":"bigger_plate","number_entrees":3,"number_sides":1,"price":"9.65"},...\]

#### Order Price Query By Name
Route: /dish_list/price?dish_id={id}&item={item_name}&item={item_name}...
Ex: http://localhost:5003/dish_list/price?dish_id=1&item=honey_seasame_chicken&item=black_pepper_angus_steak&item=fried_rice
Ex Response: {"price":16.79}

#### Order Price Query By ID
Route: /dish_list/price_by_id?dish_id={id}&item={item_id}&item={item_id}...
Ex: http://localhost:5003/dish_list/price_by_id?dish_id=1&item=2&item=5&item=10
Ex Response: {"price":16.79}

### Inventory

#### Single Inventory Item Query
Route: /inventory?id={id}
Ex: http://localhost:5003/inventory?id=3
Ex Response: {"item_id":3,"item_name":"black_pepper_angus_steak","servings":"12.00","restock_quantity":300,"item_price":"4.02","food_type":"entree","minimum_amount":50}

Route: /inventory?name={name}
Ex: http://localhost:5003/inventory?name=black_pepper_angus_steak
Ex Response: {"item_id":3,"item_name":"black_pepper_angus_steak","servings":"12.00","restock_quantity":300,"item_price":"4.02","food_type":"entree","minimum_amount":50}

#### Add Item to Inventory
Route:
/inventory/add?id={item_id}&name={item_name}&servings={servings}&restock_quantity={restock_quantity}&price={item_price}&food_type={food_type}&minimum_amount={minimum_amount}
Ex: http://localhost:5003/inventory/add?id21=&name=testname&servings=10&restock_quantity=30&price=3.21&food_type=entree&minimum_amount=50
Ex Response: No response

#### Remove Item From Inventory
Route: /innentory/delete?id={item_id}
Ex: http://localhost:5003/inventory/delete?id=22
Ex Response: No response

#### Subtract Servings From Item
Route: /inventory/subtract?id={id}&servings={number of servings}
Ex: http://localhost:5003/inventory/subtract?id=3&servings=1
Ex Response: No response

#### Update Servings For Item
Route: /inventory/update_servings?id={id}&servings={number of servings}
Ex: http://localhost:5003/inventory/update_servings?id=3&servings=12
Ex Response: No response

#### Update Price For Item
Route: /inventory/update_price?id={id}&price={new price}
Ex: http://localhost:5003/inventory/update_price?id=3&price=4.01
Ex Response: No response

#### Get Full Inventory
Route: /inventory/summary
Ex: http://localhost:5003/inventory/summary
Ex Response: \[{"item_id":5,"item_name":"sweetfire_chicken_breast","servings":"130.00","restock_quantity":300,"item_price":"3.21","food_type":"entree","minimum_amount":50},...\]

#### Get Next Available Inventory ID
Route: /inventory/nextID
Ex: http://localhost:5003/inventory/nextID
Ex Response: {"nextID":22}

#### Restock Full Inventory
Route: /inventory/restock
Ex: http://localhost:5003/inventory/restock
Ex Response: No response


#### Restock Critical Inventory
Route: /inventory/critical_restock
Ex: http://localhost:5003/inventory/critical_restock
Ex Response: No response

#### Get Seasonal Items
Route: /inventory/seasonal_items
Ex: http://localhost:5003/inventory/seasonal_items
Ex Response: [{"item_id":21,"item_name":"seasonal_chicken_5","servings":"300.00","restock_quantity":300,"item_price":"10.00","food_type":"entree","minimum_amount":30}]

### Order History

#### Single Order Item Query
Route: /order_history?id={id}
Ex: http://localhost:5003/order_history?id=3
Ex Response: {"transaction_id":3,"employee_id":1,"date":"2022-10-01T05:00:00.000Z","type_of_dish":"bigger plate","entree_dish":"honey_seasame_chicken,orange_chicken","entree_amt_servings":"2,4","side_ingredients":"brown_steamed_rice","side_amt_servings":5,"appetizer_ingredients":"chicken_egg_roll","appetizer_amt_servings":1,"price":"13.203985300"}

#### Add Order To History
Route: /order_history/add?transaction_id={transaction_id}&employee_id={employee_id}&date={date}&type_of_dish={type_of_dish}&entree_dish={entree_dish}&entree_amt_servings={entree_amt_servings}&side_ingredients={side_ingredients}&side_amt_servings={side_amt_servings}&appetizer_ingredients={appetizer_ingredients}&appetizer_amt_servings={appetizer_amt_servings}&price={price}
Ex: http://localhost:5003/order_history/add?transaction_id=2&employee_id=2&date=2022-10-01&type_of_dish=plate&entree_dish=honey_seasame_chicken,orange_chicken&entree_amt_servings=4,2&side_ingredients=white_steamed_rice&side_amt_servings=2&appetizer_ingredients=chicken_egg_roll&appetizer_amt_servings=2&price=16.07

Ex Response: No Response

#### Get Next Available Order ID
Route: /order_history/nextID
Ex: http://localhost:5003/order_history/nextID
Ex Response: {"nextID":5538}

#### Get Full Order History
Route: /order_history/summary
Ex: http://localhost:5003/order_history/summary
Ex Response: \[{"transaction_id":3,"employee_id":1,"date":"2022-10-01T05:00:00.000Z","type_of_dish":"bigger plate","entree_dish":"honey_seasame_chicken,orange_chicken","entree_amt_servings":"2,4","side_ingredients":"brown_steamed_rice","side_amt_servings":5,"appetizer_ingredients":"chicken_egg_roll","appetizer_amt_servings":1,"price":"13.203985300"},...\]

### Roster

#### Single Employee Query
Route: /roster?id={id}
Ex: http://localhost:5003/roster?id=3
Ex Response: {"employee_id":3,"employee_name":"Jackie Wells","is_manager":false}

#### Get Full Roster
Route: /roster/summary
Ex: http://localhost:5003/roster/summary
Ex Response: \[{"employee_id":3,"employee_name":"Jackie Wells","is_manager":false},...\]

#### Delete Employee
Route: /roster/delete?id={employee_id}
Ex: http://localhost:5003/roster/delete?id=4
Ex Response: No response
Note: '%20' represents a space in the database entry

#### Add Employee 
Route: roster/add?id={id}&name={employee_name}}&manager={1 for manager, 0 for not}
Ex: http://localhost:5003/roster/add?id=3&name=Jackie%20Wells&manager=0
Ex Response: No response

#### Get Next Available Employee ID
Route: /roster/nextID
Ex: http://localhost:5003/roster/nextID
Ex Response: {"nextID":11}

#### Update Type (Manager/Not) By Employee ID
Route: /roster/update_type?id={employee_id}&manager={1 for manager, 0 for not}
Ex: http://localhost:5003/roster/update_type?id=4&manager=1
Ex Response: No Response

### Authorized Emails

#### Get Full List Of Emails
Route: /authorized_emails/summary
Ex: http://localhost:5003/authorized_emails/summary
Ex Response: [{"email":"alex.m.deyoung@tamu.edu"},{"email":"casazzan@tamu.edu"},...]

#### Add email
Route: /authorized_emails/add?email={email}
Ex: http://localhost:5003/authorized_emails/add?email={email}
Ex Response: No Response