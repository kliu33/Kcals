Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :channels, only: [:index, :create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"

end