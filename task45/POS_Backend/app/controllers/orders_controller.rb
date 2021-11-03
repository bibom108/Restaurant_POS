class OrdersController < ApplicationController
  before_action :set_order, only: %i[ show edit update destroy ]

  # GET /orders or /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1 or /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new

  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders or /orders.json
  def create
    @order = Order.new(order_params)
    update_from_param(params)
    respond_to do |format|
      if @order.save
        format.html { redirect_to @order, notice: "Order was successfully created." }
        format.json { render :show, status: :created, location: @order }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /orders/1 or /orders/1.json
  def update
    update_from_param(params)
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: "Order was successfully updated." }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1 or /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: "Order was successfully destroyed." }
      format.json { head :no_content }
    end
  end

    # Use callbacks to share common setup or constraints between actions.
  def set_order
      @order = Order.find(params[:id])
  end

    # Only allow a list of trusted parameters through.
  def order_params
      params.require(:order).permit(:customer_id, :total_price, :quantity)
  end

  def update_from_param(params)
    food_ids = params[:order][:food_ids].reject(&:blank?)
    foods = Food.where(id: food_ids)
    @order.foods = foods

    # food_ids.each do |food_id|
    # order_food = OrderFood.where(order_id: @order.id, food_id: food_id).first_or_create
    #   order_food.quantity = 100
    #   order_food.total_price = 1000
    #   order_food.save
    # end

  end
end
