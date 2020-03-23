Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :graves, only: [:index, :show, :create, :update, :destroy]
  resources :corpses, only: [:index, :show, :create, :update, :destroy]
  resources :flowers, only: [:index, :show, :create, :destroy]

end
