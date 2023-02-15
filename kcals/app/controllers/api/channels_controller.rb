class Api::ChannelsController < ApplicationController
  before_action :require_logged_in, except: [:index]

  def index
    @channels = Channel.all
    render :index
  end

  def show
    @channel = Channel.find(params[:id])
    render :show
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render '_channel', locals: { channel: @channel }
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    # Your code here
    render json: nil, status: :ok
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description, :author_id)
  end
end