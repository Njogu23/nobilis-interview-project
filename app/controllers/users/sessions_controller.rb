class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      Rails.logger.debug "Authorization Header: #{request.headers['Authorization']}"
      token = request.headers['Authorization'].split(' ').last
      Rails.logger.debug "Extracted Token: #{token}"
    else
      Rails.logger.error "Authorization header missing"
      render json: { status: 401, message: "Authorization header missing." }, status: :unauthorized and return
    end

    if token.nil? || token.split('.').length != 3
      Rails.logger.error "Invalid token format: #{token}"
      render json: { status: 401, message: "Invalid token format." }, status: :unauthorized and return
    end

    begin
      jwt_payload = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!).first
      Rails.logger.debug "JWT payload: #{jwt_payload}"
      current_user = User.find(jwt_payload['sub'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      Rails.logger.error "An error occurred while decoding the JWT or finding the user: #{e.message}"
      render json: { status: 401, message: "Couldn't find an active session or token is invalid." }, status: :unauthorized and return
    end

    if current_user
      sign_out current_user
      render json: { status: 200, message: 'Logged out successfully.' }, status: :ok
    end
  end
end
