Rails.application.routes.draw do
  resources :orders
  resources :customers
  resources :foods
  resources :categories
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: "users/registrations" }
  root to: "home#index"
  resources :restaurants
  resources :pages
end
