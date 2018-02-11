Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'
  get 'core/:script' => 'welcome#core'
  get  '/ckeditor' => 'welcome#ckeditor'
  post '/ckeditor' => 'welcome#ckeditor'

  get 'generic' => 'welcome#generic'
  post 'generic' => 'welcome#generic'

  get 'tinymce' => 'welcome#tinymce'
  post 'tinymce' => 'welcome#tinymce'

  get '/generic_wiris/:name.:ext', to: redirect('/assets/generic_wiris/%{name}.%{ext}')
  get '/generic_wiris/:name(*all).:ext', to: redirect('assets/generic_wiris/%{name}%{all}.%{ext}')
  get '/:name.css', to: redirect('assets/%{name}.css')
  get '/:name.js', to: redirect('assets/%{name}.js')

  mount Wirispluginengine::Engine => 'wirispluginengine'
  # get '/assets/ckeditor/plugins/ckeditor_wiris/wirispluginengine', to: 'wirispluginengine'
  # mount Wirisplugin::Engine => '/wirisplugin'
  # get 'integration/:script' => 'welcome#integration'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  ## root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
