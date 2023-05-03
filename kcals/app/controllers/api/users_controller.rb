class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + [:photo]
    wrap_parameters include: User.attribute_names + ['password']

    def index
      @users = User.all
      render :index
    end

    def create
      @user = User.new(user_params)
      if @user.save 
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: 418
      end
    end

    def update
      @user = User.find_by(id: current_user.id)
      if params[:user].present?
        if @user.update(user_params)
          render :show
        end
      else
        if @user.update(dark_mode: !@user.dark_mode)
          render :show
        end
      end
    end
    
    private
    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :photo)
    end
end