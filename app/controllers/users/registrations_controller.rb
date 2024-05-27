# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up_params
    params.require(:user).permit(:username, :email, :password)
  end

  def create
    build_resource(sign_up_params)

    unless resource.username.present?
      render json: {
        status: { message: 'Username is required.' }
      }, status: :unprocessable_entity and return
    end

    super
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: { message: resource.errors.full_messages.to_sentence }
      }, status: :unprocessable_entity
    end
  end
end