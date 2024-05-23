class Users::SessionsController < Devise::SessionsController
  respond_to :json
  private

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    token = request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
    byebug
    Rails.logger.debug "Received token: #{token}"

    if token.nil? || token.split('.').length != 3
      Rails.logger.error "Invalid token format: #{token}"
      render json: {
        status: 401,
        message: "Invalid token format."
      }, status: :unauthorized and return
    end

    begin
     

      jwt_payload = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])

    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      Rails.logger.error "An error occurred while decoding the JWT or finding the user: #{e.message}"
      render json: {
        status: 401,
        message: "Couldn't find an active session or token is invalid."
      }, status: :unauthorized and return
    end

    if current_user
      sign_out current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    end
  end
end
