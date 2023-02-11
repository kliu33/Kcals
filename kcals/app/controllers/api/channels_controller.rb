class Api::ChannelsController < ApplicationController

    def index 
        @channels = Channel.all
    end

    def show
      
    end

    def create
      @channel = Channel.new(channel_params)
      if @channel.save 
        render :show
      else
        render json: { errors: @channel.errors.full_messages }, status: 418
      end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @channel.destroy
    end
    
    private
    def channel_params
      params.require(:channel).permit(:name, :description, :author_id)
    end
end