json.extract! food, :id, :name, :quantity, :price, :category_id, :restaurant_id, :created_at, :updated_at
json.url food_url(food, format: :json)
