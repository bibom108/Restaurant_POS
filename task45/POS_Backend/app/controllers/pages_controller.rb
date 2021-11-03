class PagesController < ApplicationController

  layout 'home'
  def index
    @foods = Food.all
  end

  def show
    @food = Food.find(params[:id])
  end

  def new
  end
end
