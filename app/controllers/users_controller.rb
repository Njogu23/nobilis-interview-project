class UsersController < ApplicationController 
  before_action :set_user, only: %i[ show update destroy ]
  skip_before_action :authorize, only: [:create, :show, :index] 
  
  def index
    @user = User.all

    render json: @user
  end

  def show
    @user = User.find_by(id: session[:user_id])
    if @user
      render json: @user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    # byebug
    @user = User.create!(user_params)
    render json: @user, status: :created
  end

  def update
    @user.update(user_params)
      render json: @user 
  end

  def destroy
    @user.destroy
  end

  def user_orders
    @user = user.find_by(id: session[:user_id])
    render json: @user.orders
  end


  private
   
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :email, :password)
    end

    #Error handling
   def invalid_record_response(e)
      render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end
end


