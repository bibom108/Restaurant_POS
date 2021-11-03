class Order < ApplicationRecord
  belongs_to :customer

  has_many :order_foods
  has_many :foods, through: :order_foods
end
