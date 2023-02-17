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
      render :show
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

  def update
    @channel = Channel.find_by(id: params[:id])
    if (@channel.update(channel_params))
        render :show
    else
        render json: { errors: ["Must have a name"] }, status: 418
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description, :author_id)
  end
end