class SetupPos < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :name
    end

    create_table :categories do |t|
      t.string :name
    end

    create_table :foods do |t|
      t.string :name
      t.integer :quantity
      t.float :price
      t.string :avatar
      t.references :restaurant
      t.references :category
      t.timestamps null: false
      t.references :user
    end

    create_table :customers do |t|
      t.string :name
    end

    create_table :orders do |t|
      t.integer :quantity
      t.float :total_price
      t.integer :status, default: 0, index: true
      t.references :customer
      t.timestamps null: false
    end

    create_table :order_foods do |t|
      t.belongs_to :order
      t.belongs_to :food
      t.integer :quantity
      t.float :total_price
    end

    add_column :users, :username, :string
    add_column :users, :role, :integer, default: true
  end
end
