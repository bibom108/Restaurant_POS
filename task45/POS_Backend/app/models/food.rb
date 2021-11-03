class Food < ApplicationRecord
  belongs_to :category
  belongs_to :restaurant

  has_many :order_foods
  has_many :orders, through: :order_foods

  mount_uploader :avatar, AvatarUploader
end

