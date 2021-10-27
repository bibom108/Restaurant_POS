json.extract! order, :id, :Customer_id, :total_price, :quantity, :created_at, :updated_at
json.url order_url(order, format: :json)
