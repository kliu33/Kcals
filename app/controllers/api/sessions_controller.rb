class Api::SessionsController < ApplicationController
    def show
        if current_user
          @user = current_user
          render 'api/users/show'
        else
          render json: {user: nil}
        end
      end
    
      def create
        email = params[:email]
        password = params[:password]
        @user = User.find_by_credentials(email, password)
        if @user 
          login!(@user)
          render 'api/users/show'
        else
          render json: {errors: ['Invalid Credentials']}, status: 418
        end
      end
    
      def destroy
        if current_user
          logout!
        end
      end
end