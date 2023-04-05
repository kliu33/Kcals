class Api::DirectMessageChannelsController < ApplicationController
    before_action :require_logged_in, except: [:index]
  
    def index
      @dm_channels = DirectMessageChannel.all
      render :index
    end
  
    def show
      @dm_channel = DirectMessageChannel.find(params[:id])
      render :show
    end
  
    def create
      @dm_channel = DirectMessageChannel.new(dm_channel_params)
  
      if @dm_channel.save
        render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    end
  
    def destroy
      @dm_channel = DirectMessageChannel.find(params[:id])
      @dm_channel.destroy
      render json: nil, status: :ok
    end
  
    # def update
    #   @channel = DirectMessageChannel.find_by(id: params[:id])
    #   if (@channel.update(channel_params))
    #       render :show
    #   else
    #       render json: { errors: ["Must have a name"] }, status: 418
    #   end
    # end
  
    private
  
    def dm_channel_params
      params.require(:dm_channel).permit(:user1_id, :user2_id)
    end
  end