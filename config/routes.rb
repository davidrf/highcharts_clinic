Rails.application.routes.draw do
  root "launch_votes#index"
  resources :launch_votes, only: :index
end
