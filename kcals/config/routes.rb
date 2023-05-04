Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :dm_channels, only: [:index, :show, :create, :destroy]
    resources :channels, only: [:index, :show, :create, :destroy, :update]
    resources :messages, only: [:create, :destroy]
    resources :reactions, only: [:create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"

end